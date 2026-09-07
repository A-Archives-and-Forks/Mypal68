/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var EXPORTED_SYMBOLS = ["AutoplayChild"];

class AutoplayChild extends JSWindowActorChild {
  handleEvent(event) {
    this.sendAsyncMessage("GloballyAutoplayBlocked", {});
  }
}
