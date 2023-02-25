import chokidar from "chokidar";
import chalk from "chalk";
import run from "./run";
import log from "./log";

export function watch(
  files: string[],
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
        log.info("nswatch", `watcher for \`${chalk.bold(scripts)}\` is ready`);
      }
      init = true;
    })
    .on("all", (e, p) => {
      // unwatch files if they are removed
      if (e === "unlink") {
        watcher.unwatch(p);
      }
      if (init && verbose) {
        log.info("nswatch", `rerun \`${chalk.bold(scripts)}\` due to changes`);
      }
      if (init) {
        run(scripts);
      }
    });
}
