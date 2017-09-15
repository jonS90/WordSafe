#!/usr/local/bin/node
const inquirer = require('inquirer');
var encryption = require('./encryption.js');

require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('test <file> <output>', 'testing', ()=>{}, argv => {
      encryption.encrypt(argv.file, argv.output, 'my password');
    })
    .command('decrypt <file> <output>', 'testing', console.log, argv => {
      console.log('HELLO');
      encryption.decrypt(argv.file, argv.output, 'my password');
    })
    .command('init <file>', 'Set up a new encrypted text file',
      yargs => yargs.option('specificToInit', {
        describe: 'this option is specific to init'
      }).example('$0 init my_journal', 'Creates encrypted file my_journal'),
      argv => {
        console.log("this is where we handle it", argv.file);
      }
    )
    .command('*', 'wut', ()=>{}, ()=>{ console.error('unrecognized'); })
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

// setInterval(() => {}, 1000)
