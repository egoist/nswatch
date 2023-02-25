import chokidar from "chokidar";
import * as colors from "colorette";
import run from "./run";
import log from "./log";

export function watch(
  files: string | string[],
  scripts: string | string[],
  { verbose = true } = {}
) {
  let init = false;
  const watcher = chokidar.watch(files);

  // run for first time
  run(scripts);

  // watch changes
  watcher
    .on("ready", () => {
      if (verbose) {
        log.info(
          "nswatch",
          `watcher for ${colors.bold(JSON.stringify(scripts))} is ready`
        );
      }
      init = true;
    })
    .on("all", (e, p) => {
      // unwatch files if they are removed
      if (e === "unlink") {
        watcher.unwatch(p);
      }
      if (init && verbose) {
        log.info(
          "nswatch",
          `rerun ${colors.bold(JSON.stringify(scripts))} due to changes`
        );
      }
      if (init) {
        run(scripts);
      }
    });
}
