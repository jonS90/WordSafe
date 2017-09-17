const inquirer   = require('inquirer');
const encryption = require('../encryption.js');
const Readable   = require('stream').Readable;
const fs         = require('fs');
const yargutils  = require('../utils/yarg-utils.js');

module.exports = {
  command: 'init [file]',
  describe: 'Set up a new encrypted text file',
  builder(yargs) {
    yargs.option('specificTo_INIT', {
      alias: 'x',
      describe: 'this is specific to the init command'
    });
  },
  async handler(argv) {
    let prompter = new yargutils.Prompter();
    if (!argv.file) prompter.encryptedFile();
    prompter.password();

    var userinputs = await prompter.prompt();
    var password = userinputs.password;
    var file = argv.file || userinputs.file;

    var stringStream = new Readable();
    stringStream._read = () => {};
    stringStream.push('Welcome to your encrypted text file :-)\n');
    //                                                        ^ POSIX
    stringStream.push(null);

    return encryption.streams.encrypt(stringStream, fs.createWriteStream(file), password).catch(console.error);
  }
};
