const encryption  = require('../encryption.js');
const fs          = require('fs');
const streamUtils = require('../utils/stream-utils.js');
const yargutils   = require('../utils/yarg-utils.js');

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

    var unencryptedStream = streamUtils.fromString('Welcome to your encrypted text file :-)');

    return encryption.streams.encrypt(unencryptedStream, fs.createWriteStream(file), password).catch(console.error);
  }
};
