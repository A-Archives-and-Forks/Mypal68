/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var EXPORTED_SYMBOLS = ["ZoomParent"];

class ZoomParent extends JSWindowActorParent {
  receiveMessage(message) {
    let browser = this.browsingContext.top.embedderElement;
    if (!browser) {
      return;
    }

    let document = browser.ownerGlobal.document;

    switch (message.name) {
      case "PreFullZoomChange": {
        let event = document.createEvent("Events");
        event.initEvent("PreFullZoomChange", true, false);
        browser.dispatchEvent(event);
        break;
      }

      case "FullZoomChange": {
        let event = document.createEvent("Events");
        event.initEvent("FullZoomChange", true, false);
        browser.dispatchEvent(event);
        break;
      }

      case "TextZoomChange": {
        let event = document.createEvent("Events");
        event.initEvent("TextZoomChange", true, false);
        browser.dispatchEvent(event);
        break;
      }

      case "ZoomChangeUsingMouseWheel": {
        let event = document.createEvent("Events");
        event.initEvent("ZoomChangeUsingMouseWheel", true, false);
        browser.dispatchEvent(event);
        break;
      }
    }
  }
}
