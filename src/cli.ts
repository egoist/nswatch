#!/usr/bin/env node

import { cac } from "cac";
import JoyCon from "joycon";
import { version } from "../package.json";
import { watch } from "./";
import { configSchema } from "./schema";

const cli = cac("nswatch");

type Flags = { script?: string | string[]; verbose?: boolean };

const runWatchInPkg = (verbose?: boolean) => {
  const joycon = new JoyCon();
  const pkg = joycon.loadSync(["package.json"]);
  const watchConfig = configSchema.parse(
    pkg.data.nswatch || pkg.data.watch || {}
  );
  if (watchConfig) {
    for (const files of Object.keys(watchConfig)) {
      watch(files, watchConfig[files], { verbose });
    }
  } else {
    cli.outputHelp();
  }
};

const main = (input: string[], flags: Flags) => {
  const scripts = flags.script;
  if (input.length === 0 || !scripts) {
    runWatchInPkg(flags.verbose);
    return;
  }
  watch(input, scripts, { verbose: flags.verbose });
};

cli
  .command("[files]", "Run npm scripts and watch for changes")
  .option("-V, --verbose", "Display more verbose output", { default: true })
  .option("-s, --script <script>", "Specify npm scripts to run")
  .action(main);

cli.help();
cli.version(version);
cli.parse();
