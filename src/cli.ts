
#!/usr/bin/env node
import {cac} from 'cac'
import JoyCon  from 'joycon'
import watch from './'

const cli = cac()

type Flags = {script?: string, verbose?: boolean}

const runWatchInPkg = (flags: Flags) => {
  const joycon = new JoyCon()
  const pkg = joycon.loadSync(['package.json'])
  const watchConfig = pkg.data.nswatch || pkg.data.watch
  if (watchConfig) {
    for (const files of Object.keys(watchConfig)) {
      watch(files, watchConfig[files], {verbose: flags.verbose})
    }
  } else {
    cli.outputHelp()
  }
}

const main = (input: string[], flags: Flags) => {
  const files = input[0]
  const scripts = flags.script
  if (!files || !scripts) {
    runWatchInPkg(flags)
    return
  }
  watch(files, scripts, {verbose: flags.verbose})
}

cli
  .usage('nswatch [files] --script [scripts]')
  .option('V, verbose', 'Display more verbose output', {default: true})
  .command('*', 'Run npm scripts and watch for changes')
  .action(main)
  
cli.parse()
