const config     = require('../config.js');
const encryption = require('../encryption.js');
const fs         = require('fs');
const tmp        = require('tmp');
const yargutils  = require('../utils/yarg-utils.js');
const CombinedStream = require('combined-stream');


tmp.setGracefulCleanup(); // Cleanup temporary files even when an uncaught exception occurs
// TODO need to call cleanup callback for safety

module.exports = {
  command: 'push <file>',
  describe: 'Open an empty editor for you to type in and append the contents you type to <file>',
  builder(yargs) {
    yargs.string('e');
    yargutils.options.customEditorOption(yargs);
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
  async handler(argv) {
    var {password} = await new yargutils.Prompter().password().prompt();
    var tmpFileWithNewContent, tmpFileForDecryption;
    try {

      { // check that we can decrypt without throwing any error
        let tmpFile = tmp.fileSync();
        await encryption.filenames.decrypt(argv.file, tmpFile.name, password);
        tmpFile.removeCallback();
      }

      // open empty file
      tmpFileWithNewContent = tmp.fileSync();
      await config.openEditor(tmpFileWithNewContent.name, argv);

      tmpFileForDecryption = tmp.fileSync();
      await encryption.filenames.decrypt(argv.file, tmpFileForDecryption.name, password);

      var combinedStream = new CombinedStream();
      combinedStream.append(fs.createReadStream(tmpFileForDecryption.name));
      combinedStream.append(fs.createReadStream(tmpFileWithNewContent.name));

      await encryption.streams.encrypt(combinedStream, fs.createWriteStream(argv.file), password);
    } catch(e) {
      console.error(e);
    }
    if (tmpFileWithNewContent) tmpFileWithNewContent.removeCallback();
    if (tmpFileForDecryption)  tmpFileForDecryption.removeCallback();
  }
};
