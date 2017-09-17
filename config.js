const child_process = require('child_process');
var config = {};

try {
  var configPath = process.env.XDG_CONFIG_HOME || process.env.HOME + '/.config';
  configPath += '/wordsafe/config.json';
  config = require(configPath);
} catch(e) { /**/ }

module.exports = Object.assign(config, {
  openEditor(filepath, vargs) {
    if (vargs.editor) {
      config.editor          = vargs.editor;
      config.editorArguments = [];
    }
    if (!config.editor) {
      return require('opn')(filepath);
    } else {
      return new Promise((resolve, reject) => {
        let editor = child_process.spawn(config.editor, [...(config.editorArguments || []), filepath], {
          stdio: 'inherit'
        });
        editor.on('close', resolve);
        editor.on('error', reject);
      });
    }
  }
});
