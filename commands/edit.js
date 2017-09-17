const config     = require('../config.js');
const encryption = require('../encryption.js');
const fs         = require('fs');
const inquirer   = require('inquirer');
const tmp        = require('tmp');
const yargutils  = require('../utils/yarg-utils.js');

tmp.setGracefulCleanup(); // Cleanup temporary files even when an uncaught exception occurs
// TODO need to call cleanup callback for safety

module.exports = {
  command: 'edit <file>',
  describe: 'Edit encrypted file with editor of your choice',
  builder(yargs) {
    yargs.string('e');
    yargutils.options.customEditorOption(yargs);
    yargs.option('e', {
      alias: 'editor',
      describe: '(NOT IMPLEMENTED) Override default/pre-configured editor'
    });
    yargs.boolean('d');
    yargs.option('d', {
      alias: 'append-date',
      describe: '(NOT IMPLEMENTED) Append today\'s date'
    });
    yargs.boolean('x');
    yargs.option('x', {
      alias: 'stdin-password',
      describe: '(NOT IMPLEMENTED) Read password from stdin'
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
    var tmpFile;
    inquirer.prompt(questions).then(userinputs => {
      tmpFile = tmp.fileSync();
      encryption.streams.decrypt(
        fs.createReadStream(argv.file),
        fs.createWriteStream(tmpFile.name),
        userinputs.password
      ).then(() => {
        return config.openEditor(tmpFile.name);
      }).then(() => {
        return encryption.streams.encrypt(
          fs.createReadStream(tmpFile.name),
          fs.createWriteStream(argv.file),
          userinputs.password
        );
      }).catch(e => {
        tmpFile.removeCallback();
        console.error(e);
      });
    });
  }
};
