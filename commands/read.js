const config     = require('../config.js');
const encryption = require('../encryption.js');
const tmp        = require('tmp');
const yargutils  = require('../utils/yarg-utils.js');

tmp.setGracefulCleanup(); // Cleanup temporary files even when an uncaught exception occurs

module.exports = {
  command: 'read <file>',
  describe: 'View encrypted file but don\'t save changes',
  builder(yargs) {
    yargutils.options.customEditorOption(yargs);
  },
  async handler(argv) {
    var {password} = await new yargutils.Prompter().password().prompt();
    var tmpFile = tmp.fileSync();
    try {
      await encryption.filenames.decrypt(argv.file, tmpFile.name, password);
      await config.openEditor(tmpFile.name, argv);
    } catch(e) {
      console.error(e);
    }
    tmpFile.removeCallback();
  }
};
