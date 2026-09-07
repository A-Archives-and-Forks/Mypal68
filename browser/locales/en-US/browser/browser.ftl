# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

browser-main-window =
  .data-title-default = { -brand-full-name }
  .data-title-private = { -brand-full-name } (Private Browsing)
  .data-content-title-default = { $content-title } - { -brand-full-name }
  .data-content-title-private = { $content-title } - { -brand-full-name } (Private Browsing)

browser-main-window-mac =
  .data-title-default = { -brand-full-name }
  .data-title-private = { -brand-full-name } - (Private Browsing)
  .data-content-title-default = { $content-title }
  .data-content-title-private = { $content-title } - (Private Browsing)

browser-main-window-title = { -brand-full-name }

appmenuitem-customize-mode =
    .label = Customize…

urlbar-identity-button =
    .aria-label = View site information

## Tooltips for images appearing in the address bar

urlbar-services-notification-anchor =
    .tooltiptext = Open install message panel
urlbar-web-notification-anchor =
    .tooltiptext = Change whether you can receive notifications from the site
urlbar-midi-notification-anchor =
    .tooltiptext = Open MIDI panel
urlbar-web-authn-anchor =
    .tooltiptext = Open Web Authentication panel
urlbar-canvas-notification-anchor =
    .tooltiptext = Manage canvas extraction permission
urlbar-web-rtc-share-microphone-notification-anchor =
    .tooltiptext = Manage sharing your microphone with the site
urlbar-default-notification-anchor =
    .tooltiptext = Open message panel
urlbar-geolocation-notification-anchor =
    .tooltiptext = Open location request panel
urlbar-storage-access-anchor =
    .tooltiptext = Open browsing activity permission panel
urlbar-translate-notification-anchor =
    .tooltiptext = Translate this page
urlbar-web-rtc-share-screen-notification-anchor =
    .tooltiptext = Manage sharing your windows or screen with the site
urlbar-indexed-db-notification-anchor =
    .tooltiptext = Open offline storage message panel
urlbar-password-notification-anchor =
    .tooltiptext = Open save password message panel
urlbar-translated-notification-anchor =
    .tooltiptext = Manage page translation
urlbar-plugins-notification-anchor =
    .tooltiptext = Manage plug-in use
urlbar-web-rtc-share-devices-notification-anchor =
    .tooltiptext = Manage sharing your camera and/or microphone with the site
urlbar-autoplay-notification-anchor =
    .tooltiptext = Open autoplay panel
urlbar-persistent-storage-notification-anchor =
    .tooltiptext = Store data in Persistent Storage
urlbar-addons-notification-anchor =
    .tooltiptext = Open add-on installation message panel

urlbar-geolocation-blocked =
    .tooltiptext = You have blocked location information for this website.
urlbar-web-notifications-blocked =
    .tooltiptext = You have blocked notifications for this website.
urlbar-camera-blocked =
    .tooltiptext = You have blocked your camera for this website.
urlbar-microphone-blocked =
    .tooltiptext = You have blocked your microphone for this website.
urlbar-screen-blocked =
    .tooltiptext = You have blocked this website from sharing your screen.
urlbar-persistent-storage-blocked =
    .tooltiptext = You have blocked persistent storage for this website.
urlbar-popup-blocked =
    .tooltiptext = You have blocked pop-ups for this website.
urlbar-autoplay-media-blocked =
    .tooltiptext = You have blocked autoplay media with sound for this website.
urlbar-canvas-blocked =
    .tooltiptext = You have blocked canvas data extraction for this website.
urlbar-flash-blocked =
    .tooltiptext = You have blocked this website from using the Adobe Flash plugin.
urlbar-midi-blocked =
    .tooltiptext = You have blocked MIDI access for this website.
urlbar-install-blocked =
    .tooltiptext = You have blocked add-on installation for this website.

# Variables
#   $shortcut (String) - A keyboard shortcut for the edit bookmark command.
urlbar-star-edit-bookmark =
    .tooltiptext = Edit this bookmark ({ $shortcut })

# Variables
#   $shortcut (String) - A keyboard shortcut for the add bookmark command.
urlbar-star-add-bookmark =
    .tooltiptext = Bookmark this page ({ $shortcut })

## Page Action Context Menu

page-action-add-to-urlbar =
    .label = Add to Address Bar
page-action-manage-extension =
    .label = Manage Extension…
page-action-remove-from-urlbar =
    .label = Remove from Address Bar

## Page Action menu

# Variables
# $tabCount (integer) - Number of tabs selected
page-action-send-tabs-panel =
  .label = { $tabCount ->
      [1] Send Tab to Device
     *[other] Send { $tabCount } Tabs to Device
  }
page-action-send-tabs-urlbar =
  .tooltiptext = { $tabCount ->
      [1] Send Tab to Device
     *[other] Send { $tabCount } Tabs to Device
  }
page-action-copy-url-panel =
  .label = Copy Link
page-action-copy-url-urlbar =
  .tooltiptext = Copy Link
page-action-email-link-panel =
  .label = Email Link…
page-action-email-link-urlbar =
  .tooltiptext = Email Link…
page-action-send-tab-not-ready =
  .label = Syncing Devices…
# "Pin" is being used as a metaphor for expressing the fact that these tabs
# are "pinned" to the left edge of the tabstrip. Really we just want the
# string to express the idea that this is a lightweight and reversible
# action that keeps your tab where you can reach it easily.
page-action-pin-tab-panel =
  .label = Pin Tab
page-action-pin-tab-urlbar =
  .tooltiptext = Pin Tab
page-action-unpin-tab-panel =
  .label = Unpin Tab
page-action-unpin-tab-urlbar =
  .tooltiptext = Unpin Tab

## Auto-hide Context Menu

full-screen-autohide =
    .label = Hide Toolbars
    .accesskey = H
full-screen-exit =
    .label = Exit Full Screen Mode
    .accesskey = F

## Search Engine selection buttons (one-offs)

# This string prompts the user to use the list of one-click search engines in
# the Urlbar and searchbar.
search-one-offs-with-title = This time, search with:

# This string won't wrap, so if the translated string is longer,
# consider translating it as if it said only "Search Settings".
search-one-offs-change-settings-button =
    .label = Change Search Settings
search-one-offs-change-settings-compact-button =
    .tooltiptext = Change search settings

search-one-offs-context-open-new-tab =
    .label = Search in New Tab
    .accesskey = T
search-one-offs-context-set-as-default =
    .label = Set as Default Search Engine
    .accesskey = D

## Bookmark Panel

bookmark-panel-show-editor-checkbox =
    .label = Show editor when saving
    .accesskey = S

bookmark-panel-done-button =
    .label = Done

# Width of the bookmark panel.
# Should be large enough to fully display the Done and
# Cancel/Remove Bookmark buttons.
bookmark-panel =
    .style = min-width: 23em

## Identity Panel

identity-connection = Connection
identity-connection-not-secure = Connection not secure
identity-connection-secure = Connection secure
identity-connection-internal = This is a secure { -brand-short-name } page.
identity-connection-file = This page is stored on your computer.
identity-extension-page = This page is loaded from an extension.
identity-active-blocked = { -brand-short-name } has blocked parts of this page that are not secure.
identity-custom-root = Connection verified by a certificate issuer that is not recognized by Mozilla.
identity-passive-loaded = Parts of this page are not secure (such as images).
identity-active-loaded = You have disabled protection on this page.
identity-weak-encryption = This page uses weak encryption.
identity-insecure-login-forms = Logins entered on this page could be compromised.
identity-permissions =
    .value = Permissions
identity-permissions-reload-hint = You may need to reload the page for changes to apply.
identity-permissions-empty = You have not granted this site any special permissions.
identity-clear-site-data =
    .label = Clear Cookies and Site Data…
identity-ev-owner-label = Certificate issued to:
identity-description-custom-root = Mozilla does not recognize this certificate issuer. It may have been added from your operating system or by an administrator. <label data-l10n-name="link">Learn More</label>
identity-remove-cert-exception =
    .label = Remove Exception
    .accesskey = R
identity-description-insecure = Your connection to this site is not private. Information you submit could be viewed by others (like passwords, messages, credit cards, etc.).
identity-description-insecure-login-forms = The login information you enter on this page is not secure and could be compromised.
identity-description-weak-cipher-intro = Your connection to this website uses weak encryption and is not private.
identity-description-weak-cipher-risk = Other people can view your information or modify the website’s behavior.
identity-description-active-blocked = { -brand-short-name } has blocked parts of this page that are not secure. <label data-l10n-name="link">Learn More</label>
identity-description-passive-loaded = Your connection is not private and information you share with the site could be viewed by others.
identity-description-passive-loaded-insecure = This website contains content that is not secure (such as images). <label data-l10n-name="link">Learn More</label>
identity-description-passive-loaded-mixed = Although { -brand-short-name } has blocked some content, there is still content on the page that is not secure (such as images). <label data-l10n-name="link">Learn More</label>
identity-description-active-loaded = This website contains content that is not secure (such as scripts) and your connection to it is not private.
identity-description-active-loaded-insecure = Information you share with this site could be viewed by others (like passwords, messages, credit cards, etc.).
identity-learn-more =
    .value = Learn More
identity-disable-mixed-content-blocking =
    .label = Disable protection for now
    .accesskey = D
identity-enable-mixed-content-blocking =
    .label = Enable protection
    .accesskey = E
identity-more-info-link-text =
    .label = More Information
identity-permissions-pref =
    .tooltiptext = Open Permissions Preferences
identity-security-view =
    .title = Site Security

## WebRTC Pop-up notifications

popup-select-camera =
    .value = Camera to share:
    .accesskey = C
popup-select-microphone =
    .value = Microphone to share:
    .accesskey = M
popup-all-windows-shared = All visible windows on your screen will be shared.

popup-screen-sharing-not-now =
  .label = Not Now
  .accesskey = w

popup-screen-sharing-never =
  .label = Never Allow
  .accesskey = N

popup-silence-notifications-checkbox = Disable notifications from { -brand-short-name } while sharing
popup-silence-notifications-checkbox-warning = { -brand-short-name } will not display notifications while you are sharing.

## URL Bar

urlbar-placeholder =
  .placeholder = Search or enter address

# Variables
#  $name (String): the name of the user's default search engine
urlbar-placeholder-with-name =
  .placeholder = Search with { $name } or enter address
urlbar-remote-control-notification-anchor =
  .tooltiptext = Browser is under remote control
urlbar-permissions-granted =
  .tooltiptext = You have granted this website additional permissions.
urlbar-switch-to-tab =
  .value = Switch to tab:

# Used to indicate that a selected autocomplete entry is provided by an extension.
urlbar-extension =
  .value = Extension:

urlbar-go-end-cap =
  .tooltiptext = Go to the address in the Location Bar
urlbar-page-action-button =
  .tooltiptext = Page actions
