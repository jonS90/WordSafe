#!/usr/bin/env node

const chalk = require('chalk');
let usage =
`
${chalk.bold('wordsafe')}

Usage:
  wordsafe <command> [options]

Description:
  WordSafe makes it practical to decrypt and re-encrypted a plaintext file on a
  regular basis.
`.slice(1,-1);

require('yargs')
  .usage(usage)
  .command(require('./commands/init.js'))
  .command(require('./commands/edit.js'))
  .command(require('./commands/push.js'))
  .command(require('./commands/read.js'))
  .command('change-password', '(NOT IMPLEMENTED)')
  .command('change-cipher', '(NOT IMPLEMENTED)')
  .command(require('./commands/decrypt.js'))
  // .command('*', 'wut', ()=>{}, ()=>{ console.error('unrecognized'); })
  .option('v', {
    alias: 'verbose',
    describe: 'Chatty logs'
  })
  .boolean('verbose')
  .help()
  .command('*', '', ()=>{}, ()=> {
    // require('yargs').showHelp(); DOESNT WORK FOR DESIRED CONTEXT
    // re-run wordsafe with "help" command
    require('child_process').spawn('wordsafe', ['help'], {stdio: 'inherit'});
  })
  .example('wordsafe init encrypted-file\nwordsafe edit encrypted-file --editor=vim')
  // .alias('h', 'help')
  // .alias('h', '*')
  .argv;
