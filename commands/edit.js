const config          = require('../config.js');
const encryption      = require('../encryption.js');
const tmp             = require('tmp');
const yargutils       = require('../utils/yarg-utils.js');
const { makeDateStr } = require('../utils/misc.js');
const fs              = require('fs');

tmp.setGracefulCleanup(); // Cleanup temporary files even when an uncaught exception occurs

module.exports = {
  command: 'edit <file>',
  describe: 'Edit encrypted file with editor of your choice',
  builder(yargs) {
    yargutils.options.customEditorOption(yargs);
    yargs.boolean('d');
    yargs.option('d', {
      alias: 'append-date',
      describe: 'Append today\'s date'
    });
    yargs.boolean('x');
    yargs.option('x', {
      alias: 'stdin-password',
      describe: '(NOT IMPLEMENTED) Read password from stdin'
    });
  },
  async handler(argv) {
    var {password} = await new yargutils.Prompter().password().prompt();
    var tmpFile = tmp.fileSync();
    try {
      await encryption.filenames.decrypt(argv.file, tmpFile.name, password);
      if (argv['append-date']) {
        fs.appendFileSync(tmpFile.name, makeDateStr() + '\n');
      }
      await config.openEditor(tmpFile.name, argv);
      await encryption.filenames.encrypt(tmpFile.name, argv.file, password);
    } catch(e) {
      console.error(e);
    }
    tmpFile.removeCallback();
  }
};
