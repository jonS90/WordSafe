module.exports = function getLogger(argv) {
  return {
    log(...args) {
      if (!argv.verbose) return;
      console.log(...args);
    },
    warn(...args) {
      console.warn(...args);
    },
    error(...args) {
      console.error(...args);
    }
  };
};
