/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

const { updateAppInfo } = ChromeUtils.import(
  "resource://testing-common/AppInfo.jsm"
);

updateAppInfo({
  name: "SessionRestoreTest",
  ID: "{230de50e-4cd1-11dc-8314-0800200c9a66}",
  version: "1",
  platformVersion: "",
});

function makeState(id) {
  return {
    windows: [
      {
        tabs: [
          {
            entries: [{ url: `http://example.com/#${id}` }],
            index: 1,
          },
        ],
      },
    ],
  };
}

async function readState(path) {
  let source = await OS.File.read(path, {
    encoding: "utf-8",
    compression: "lz4",
  });
  return JSON.parse(source);
}

add_task(async function test_writes_continue_after_worker_failure_threshold() {
  do_get_profile();

  const { SessionFile } = ChromeUtils.import(
    "resource:///modules/sessionstore/SessionFile.jsm"
  );
  let paths = SessionFile.Paths;

  let initialState = makeState("initial");
  await OS.File.writeAtomic(paths.clean, JSON.stringify(initialState), {
    encoding: "utf-8",
    compression: "lz4",
  });
  await SessionFile.read();

  // Structured cloning supports cycles, but JSON.stringify in SessionWorker
  // does not. Each write therefore reaches the worker and fails there.
  let invalidState = makeState("invalid");
  invalidState.cycle = invalidState;

  for (let i = 0; i < SessionFile.MaxWriteFailures; ++i) {
    await SessionFile.write(invalidState);
  }

  Assert.ok(
    await OS.File.exists(paths.clean),
    "Failed writes should not move the clean session file"
  );

  // The threshold terminates the unhealthy worker. The next write must create
  // a replacement worker and reset its failure count.
  let firstState = makeState("first-success");
  await SessionFile.write(firstState);
  Assert.deepEqual(
    await readState(paths.recovery),
    firstState,
    "The replacement worker should complete its first write"
  );

  // If the failure count was not reset, the successful write above terminates
  // its replacement worker too. A new worker then starts from the stale
  // original `clean` state, tries to move the already-moved clean file, and
  // fails before updating recovery.
  let secondState = makeState("second-success");
  await SessionFile.write(secondState);
  Assert.deepEqual(
    await readState(paths.recovery),
    secondState,
    "A second write should succeed without another worker restart"
  );

  let thirdState = makeState("third-success");
  await SessionFile.write(thirdState);
  Assert.deepEqual(
    await readState(paths.recovery),
    thirdState,
    "Writes should continue succeeding after recovery"
  );
});
