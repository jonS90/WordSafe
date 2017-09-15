const inquirer = require('inquirer');
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
    inquirer.prompt([
      {
        type: 'password',
        message: 'Encryption password',
        name: 'thepassword'
      }
    ]).then(console.log);
  }
};
