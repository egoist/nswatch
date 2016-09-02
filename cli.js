#!/usr/bin/env node
'use strict'
const cac = require('cac')
const readPkg = require('read-pkg')
const watch = require('./')

const cli = cac()

const runWatchInPkg = flags => {
  let pkg = {}
  try {
    pkg = readPkg.sync()
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }
  const watchConfig = pkg.watch
  if (watchConfig) {
    for (const files of Object.keys(watchConfig)) {
      watch(files, watchConfig[files], {verbose: flags.verbose})
    }
  } else {
    cli.showHelp()
  }
}

const main = (input, flags) => {
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
  .option('V, verbose', 'Display more verbose output', true)
  .command('*', 'Run npm scripts and watch for changes', main)
  .parse()
