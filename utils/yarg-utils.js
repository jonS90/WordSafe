const inquirer = require('inquirer');

module.exports = {
  options: {
    customEditorOption(yargs) {
      yargs.string('e');
      yargs.option('e', {
        alias: 'editor',
        describe: 'Override default/pre-configured editor'
      });
    }
  },
  Prompter: class Prompter{
    constructor() {
      this.questions = [];
    }
    prompt() {
      return inquirer.prompt(this.questions);
    }
    encryptedFile() {
      this.questions.push({
        name: 'file',
        type: 'input',
        default: 'encrypted_file',
        message: 'Name of new encrypted file'
      });
      return this;
    }
    password() {
      this.questions.push({
        name: 'password',
        type: 'password',
        message: 'Password',
      });
      return this;
    }
  },
};
