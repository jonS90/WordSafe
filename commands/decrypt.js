const inquirer   = require('inquirer');
const encryption = require('../encryption.js');
const fs         = require('fs');
module.exports = {
  command: 'decrypt <file>',
  describe: 'Decrypt file to stdout',
  builder(yargs) {
    yargs.example('hello');
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
        message: 'Password',
      }
    ];
    inquirer.prompt(questions).then(userinputs => {
      encryption.streams.decrypt(
      fs.createReadStream(argv.file),
        process.stdout,
        userinputs.password
    ).catch(console.error);
    });
  }
};
