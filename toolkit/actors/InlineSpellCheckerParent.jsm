/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var EXPORTED_SYMBOLS = ["InlineSpellCheckerParent"];

class InlineSpellCheckerParent extends JSWindowActorParent {
  selectDictionary({ localeCode }) {
    this.sendAsyncMessage("InlineSpellChecker:selectDictionary",
                          { localeCode });
  }

  replaceMisspelling({ index }) {
    this.sendAsyncMessage("InlineSpellChecker:replaceMisspelling",
                          { index });
  }

  toggleEnabled() {
    this.sendAsyncMessage("InlineSpellChecker:toggleEnabled", {});
  }

  recheckSpelling() {
    this.sendAsyncMessage("InlineSpellChecker:recheck", {});
  }

  uninit() {
    this.sendAsyncMessage("InlineSpellChecker:uninit", {});
  }
}
