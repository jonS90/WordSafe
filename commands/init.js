const inquirer   = require('inquirer');
const encryption = require('../encryption.js');
const Readable   = require('stream').Readable;
const fs         = require('fs');

module.exports = {
  command: 'init [file]',
  describe: 'Set up a new encrypted text file',
  builder(yargs) {
    yargs.option('specificTo_INIT', {
      alias: 'x',
      describe: 'this is specific to the init command'
    });
  },
  handler(argv) {
    var questions = [
      {
        name: 'password',
        type: 'password',
        message: 'Encryption password',
      }
    ];
    if (!argv.file) {
      questions = [
        {
          name: 'file',
          type: 'input',
          default: 'encrypted_file',
          message: 'Name of new encrypted file'
        },
        ...questions
      ];
    }
    inquirer.prompt(questions).then(userinputs => {

      var password = userinputs.password;
      var file = argv.file || userinputs.file;

      var stringStream = new Readable();
      stringStream._read = () => {};
      stringStream.push('Welcome to your encrypted text file :-)\n');
      //                                                        ^ POSIX
      stringStream.push(null);

      encryption.streams.encrypt(stringStream, fs.createWriteStream(file), password).catch(console.error);
    });
  }
};
