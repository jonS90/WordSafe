#!/usr/bin/env node

const chalk = require('chalk');
let usage =
`
${chalk.bold('$0')}

Usage:
  $0 <command> [options]

Description:
  WordSafe makes it practical to decrypt and re-encrypted a plaintext file that
  you want to edit on a regular basis, such as, perhaps, an encrypted diary.
`.slice(1,-1);

require('yargs')
    .usage(usage)
    .command(require('./commands/init.js'))
    .command(require('./commands/edit.js'))
    .command('add', 'NOT IMPLEMENTED')
    .command(require('./commands/decrypt.js'))
    // .command('*', 'wut', ()=>{}, ()=>{ console.error('unrecognized'); })
    .option('v', {
      alias: 'verbose',
      describe: 'Chatty logs'
    })
    .boolean('verbose')
    .help()
    .command('*', '', ()=>{}, ()=> {
      console.error(`you might want to run \n> ${require('yargs').$0} help`);
      // require('yargs').showHelp();
    })
    // .alias('h', 'help')
    // .alias('h', '*')
    .argv;
