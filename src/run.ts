import runParallel from "./run-parallel";
import runSequence from "./run-sequence";

export default function (scripts: string | string[]) {
  if (typeof scripts === "string") {
    runSequence(scripts.split("!"));
  } else if (Array.isArray(scripts)) {
    runParallel(scripts);
  }
}
