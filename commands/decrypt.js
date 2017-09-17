const encryption = require('../encryption.js');
const fs         = require('fs');
const yargutils  = require('../utils/yarg-utils.js');

module.exports = {
  command: 'decrypt <file>',
  describe: 'Decrypt file to stdout',
  builder(yargs) {
    yargs.example('hello');
    yargs.option('stdin-password', {
      // alias: 'x',
      describe: 'Read password from stdin (NOT IMPLEMENTED)'
    });
  },
  async handler(argv) {
    try {
      var {password} = await new yargutils.Prompter().password().prompt();
      return await encryption.streams.decrypt(fs.createReadStream(argv.file), process.stdout, password);
    } catch(e) {
      console.error(e);
    }
  }
};
