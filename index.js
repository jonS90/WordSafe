#!/usr/local/bin/node
const inquirer = require('inquirer');

require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('init <file>', 'Set up a new encrypted text file',
      yargs => yargs.option('specificToInit', {
        describe: 'this option is specific to init'
      }).example('$0 init my_journal', 'Creates encrypted file my_journal'),
      argv => {
        console.log("this is where we handle it", argv.file);
      }
    )
    .option('v', {
      alias: 'verbose',
      describe: 'Chatty logs'
    })
    .boolean('verbose')
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright 2017')
    .argv;
// require('yargs')
// .command('init', 'setup new encrypted text')

setInterval(() => {}, 1000)
