import spawn from "./spawn";
import log from "./log";

export default function runSequence(scripts: string[]) {
  const exec = () => {
    if (scripts.length > 0) {
      const script = scripts.shift();
      if (script) {
        spawn("npm", ["run", script], (err) => {
          if (err) {
            log.error(script, err);
          }
          exec();
        });
      }
    }
  };

  exec();
}
