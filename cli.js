#!/usr/bin/env node
'use strict'
const cac = require('cac')
const watch = require('./')

const cli = cac()

const main = (input, flags) => {
  const files = input[0]
  const scripts = flags.script
  if (!files || !scripts) {
    return cli.showHelp()
  }
  watch(files, scripts, {verbose: flags.verbose})
}

cli
  .usage('nswatch [files] --script [scripts]')
  .option('V, verbose', 'Display more verbose output', true)
  .command('*', 'Run npm scripts and watch for changes', main)
  .parse()
