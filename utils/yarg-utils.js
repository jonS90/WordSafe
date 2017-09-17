const inquirer = require('inquirer');

module.exports = {
  options: {
    customEditorOption(yargs) {
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
    password() {
      this.questions.push({
        name: 'password',
        type: 'password',
        message: 'Password',
      });
    }
  },
};
