module.exports = {
  options: {
    customEditorOption(yargs) {
      yargs.option('e', {
        alias: 'editor',
        describe: 'Override default/pre-configured editor'
      });
    }
  }
};
