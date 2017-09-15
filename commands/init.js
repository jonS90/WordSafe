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
    console.log('HANDLER !!!!');
    console.log(argv);
    console.debug('handler()');
    console.log('%chandler()', 'font-size:15px');
  }
};
