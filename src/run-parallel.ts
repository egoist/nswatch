import spawn from "./spawn";
import log from "./log";

export default function runParallel(scripts: string[]) {
  return scripts.map((script) => {
    return spawn("npm", ["run", script], (err) => {
      if (err) {
        log.error(script, err);
      }
    });
  });
}
