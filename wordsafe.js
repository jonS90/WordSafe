#!/usr/local/bin/node

require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command(require('./commands/init.js'))
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
    .epilog('Copyright 2017')
    .argv;
