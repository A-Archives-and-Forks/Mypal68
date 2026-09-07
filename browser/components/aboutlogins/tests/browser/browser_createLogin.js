/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

add_task(async function setup() {
  let aboutLoginsTab = await BrowserTestUtils.openNewForegroundTab({
    gBrowser,
    url: "about:logins",
  });
  registerCleanupFunction(() => {
    BrowserTestUtils.removeTab(aboutLoginsTab);
    Services.logins.removeAllLogins();
  });
});

add_task(async function test_create_login() {
  let browser = gBrowser.selectedBrowser;
  await ContentTask.spawn(browser, null, async () => {
    let loginList = Cu.waiveXrays(content.document.querySelector("login-list"));
    ok(!loginList._selectedGuid, "should not be a selected guid by default");
  });

  let testCases = [
    ["ftp://ftp.example.com/", "ftp://ftp.example.com"],
    ["https://example.com/foo", "https://example.com"],
    ["http://example.com/", "http://example.com"],
    [
      "https://testuser1:testpass1@bugzilla.mozilla.org/show_bug.cgi?id=1556934",
      "https://bugzilla.mozilla.org",
    ],
    ["https://www.example.com/bar", "https://www.example.com"],
  ];

  for (let i = 0; i < testCases.length; i++) {
    let originTuple = testCases[i];
    info("Testcase " + i);
    let storageChangedPromised = TestUtils.topicObserved(
      "passwordmgr-storage-changed",
      (_, data) => data == "addLogin"
    );

    await ContentTask.spawn(browser, originTuple, async aOriginTuple => {
      let createButton = content.document
        .querySelector("login-list")
        .shadowRoot.querySelector(".create-login-button");
      createButton.click();
      await Promise.resolve();

      let loginItem = Cu.waiveXrays(
        content.document.querySelector("login-item")
      );

      let originInput = loginItem.shadowRoot.querySelector(
        "input[name='origin']"
      );
      let usernameInput = loginItem.shadowRoot.querySelector(
        "input[name='username']"
      );
      let passwordInput = loginItem.shadowRoot.querySelector(
        "input[name='password']"
      );

      originInput.value = aOriginTuple[0];
      usernameInput.value = "testuser1";
      passwordInput.value = "testpass1";

      let saveChangesButton = loginItem.shadowRoot.querySelector(
        ".save-changes-button"
      );
      saveChangesButton.click();
    });

    info("waiting for login to get added to storage");
    await storageChangedPromised;
    info("login added to storage");

    storageChangedPromised = TestUtils.topicObserved(
      "passwordmgr-storage-changed",
      (_, data) => data == "modifyLogin"
    );
    let expectedCount = i + 1;
    await ContentTask.spawn(
      browser,
      { expectedCount, originTuple },
      async ({ expectedCount: aExpectedCount, originTuple: aOriginTuple }) => {
        let loginList = Cu.waiveXrays(
          content.document.querySelector("login-list")
        );
        let loginGuid = await ContentTaskUtils.waitForCondition(() => {
          return loginList._loginGuidsSortedOrder.find(
            guid => loginList._logins[guid].login.origin == aOriginTuple[1]
          );
        }, "Waiting for login to be displayed");
        ok(loginGuid, "Expected login found in login-list");

        let loginItem = Cu.waiveXrays(
          content.document.querySelector("login-item")
        );
        is(loginItem._login.guid, loginGuid, "login-item should match");

        let { login, listItem } = loginList._logins[loginGuid];
        ok(
          listItem.classList.contains("selected"),
          "list item should be selected"
        );
        ok(
          !!listItem,
          `Stored login should only include the origin of the URL provided during creation (${
            aOriginTuple[1]
          })`
        );
        is(
          login.username,
          "testuser1",
          "Stored login should have username provided during creation"
        );
        is(
          login.password,
          "testpass1",
          "Stored login should have password provided during creation"
        );

        let editButton = loginItem.shadowRoot.querySelector(".edit-button");
        editButton.click();

        let usernameInput = loginItem.shadowRoot.querySelector(
          "input[name='username']"
        );
        let passwordInput = loginItem.shadowRoot.querySelector(
          "input[name='password']"
        );
        usernameInput.value = "testuser2";
        passwordInput.value = "testpass2";

        let saveChangesButton = loginItem.shadowRoot.querySelector(
          ".save-changes-button"
        );
        saveChangesButton.click();
      }
    );

    info("waiting for login to get modified in storage");
    await storageChangedPromised;
    info("login modified in storage");

    await ContentTask.spawn(browser, originTuple, async aOriginTuple => {
      let loginList = Cu.waiveXrays(
        content.document.querySelector("login-list")
      );
      let login = Object.values(loginList._logins).find(
        obj => obj.login.origin == aOriginTuple[1]
      ).login;
      ok(
        !!login,
        "Stored login should only include the origin of the URL provided during creation"
      );
      is(
        login.username,
        "testuser2",
        "Stored login should have modified username"
      );
      is(
        login.password,
        "testpass2",
        "Stored login should have modified password"
      );
    });
  }
});

add_task(async function test_cancel_create_login() {
  let browser = gBrowser.selectedBrowser;
  await ContentTask.spawn(browser, null, async () => {
    let loginList = Cu.waiveXrays(content.document.querySelector("login-list"));
    ok(
      loginList._selectedGuid,
      "there should be a selected guid before create mode"
    );
    ok(
      loginList._blankLoginListItem.hidden,
      "the blank login list item should be hidden before create mode"
    );

    let createButton = content.document
      .querySelector("login-list")
      .shadowRoot.querySelector(".create-login-button");
    createButton.click();

    ok(
      !loginList._selectedGuid,
      "there should be no selected guid when in create mode"
    );
    ok(
      !loginList._blankLoginListItem.hidden,
      "the blank login list item should be visible in create mode"
    );

    let loginItem = Cu.waiveXrays(content.document.querySelector("login-item"));
    let cancelButton = loginItem.shadowRoot.querySelector(".cancel-button");
    cancelButton.click();

    ok(
      loginList._selectedGuid,
      "there should be a selected guid after canceling create mode"
    );
    ok(
      loginList._blankLoginListItem.hidden,
      "the blank login list item should be hidden after canceling create mode"
    );
  });
});

add_task(async function test_create_duplicate_login() {
  let browser = gBrowser.selectedBrowser;
  EXPECTED_ERROR_MESSAGE = "This login already exists.";
  await ContentTask.spawn(browser, null, async () => {
    let loginList = Cu.waiveXrays(content.document.querySelector("login-list"));
    let createButton = loginList._createLoginButton;
    createButton.click();

    let loginItem = Cu.waiveXrays(content.document.querySelector("login-item"));
    let originInput = loginItem.shadowRoot.querySelector(
      "input[name='origin']"
    );
    let usernameInput = loginItem.shadowRoot.querySelector(
      "input[name='username']"
    );
    await ContentTaskUtils.waitForCondition(
      () => loginItem.dataset.editing,
      "waiting for 'edit' mode"
    );

    let passwordInput = loginItem.shadowRoot.querySelector(
      "input[name='password']"
    );
    const EXISTING_ORIGIN = "https://example.com";
    const EXISTING_USERNAME = "testuser2";
    originInput.value = EXISTING_ORIGIN;
    usernameInput.value = EXISTING_USERNAME;
    passwordInput.value = "different password value";

    let saveChangesButton = loginItem.shadowRoot.querySelector(
      ".save-changes-button"
    );
    saveChangesButton.click();

    await ContentTaskUtils.waitForCondition(
      () => !loginItem._errorMessage.hidden,
      "waiting until the error message is visible"
    );
    let duplicatedGuid = Object.values(loginList._logins).find(
      v =>
        v.login.origin == EXISTING_ORIGIN &&
        v.login.username == EXISTING_USERNAME
    ).login.guid;
    is(
      loginItem._errorMessageLink.dataset.errorGuid,
      duplicatedGuid,
      "Error message has GUID of existing duplicated login set on it"
    );

    let confirmationDialog = Cu.waiveXrays(
      content.document.querySelector("confirmation-dialog")
    );
    ok(
      confirmationDialog.hidden,
      "the discard-changes dialog should be hidden before clicking the error-message-text"
    );
    loginItem._errorMessageLink.querySelector("a").click();
    ok(
      !confirmationDialog.hidden,
      "the discard-changes dialog should be visible"
    );
    let discardChangesButton = confirmationDialog.shadowRoot.querySelector(
      ".confirm-button"
    );
    discardChangesButton.click();

    await ContentTaskUtils.waitForCondition(
      () =>
        Object.keys(loginItem._login).length > 1 &&
        loginItem._login.guid == duplicatedGuid,
      "waiting until the existing duplicated login is selected"
    );
    is(
      loginList._selectedGuid,
      duplicatedGuid,
      "the duplicated login should be selected in the list"
    );
  });
  EXPECTED_ERROR_MESSAGE = null;
});
