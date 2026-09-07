/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var EXPORTED_SYMBOLS = ["ZoomChild"];

/**
 * FIXME(emilio): Most of this code is a bit useless and could be changed by an
 * event listener in the parent process I suspect.
 */
class ZoomChild extends JSWindowActorChild {
  constructor() {
    super();

    this._cache = {
      fullZoom: NaN,
      textZoom: NaN,
    };
  }

  get fullZoom() {
    return this._cache.fullZoom;
  }

  get textZoom() {
    return this._cache.textZoom;
  }

  set fullZoom(value) {
    this._cache.fullZoom = value;
    this.browsingContext.fullZoom = value;
  }

  set textZoom(value) {
    this._cache.textZoom = value;
    this.browsingContext.textZoom = value;
  }

  refreshFullZoom() {
    return this._refreshZoomValue("fullZoom");
  }

  refreshTextZoom() {
    return this._refreshZoomValue("textZoom");
  }

  /**
   * Retrieves specified zoom property value from markupViewer and refreshes
   * cache if needed.
   * @param valueName Either 'fullZoom' or 'textZoom'.
   * @returns Returns true if cached value was actually refreshed.
   * @private
   */
  _refreshZoomValue(valueName) {
    let actualZoomValue = this.browsingContext[valueName];
    // Round to remove any floating-point error.
    actualZoomValue = Number(actualZoomValue.toFixed(2));
    if (actualZoomValue != this._cache[valueName]) {
      this._cache[valueName] = actualZoomValue;
      return true;
    }
    return false;
  }

  receiveMessage(message) {
    if (message.name == "FullZoom") {
      this.fullZoom = message.data.value;
    } else if (message.name == "TextZoom") {
      this.textZoom = message.data.value;
    }
  }

  handleEvent(event) {
    if (event.type == "ZoomChangeUsingMouseWheel") {
      this.sendAsyncMessage("ZoomChangeUsingMouseWheel", {});
      return;
    }

    // Only handle this event for top-level content.
    if (this.browsingContext != this.browsingContext.top) {
      return;
    }

    if (event.type == "FullZoomChange") {
      if (this.refreshFullZoom()) {
        this.sendAsyncMessage("FullZoomChange", {});
      }
      return;
    }

    if (event.type == "TextZoomChange") {
      if (this.refreshTextZoom()) {
        this.sendAsyncMessage("TextZoomChange", {});
      }
    }
  }
}
