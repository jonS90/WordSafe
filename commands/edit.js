const inquirer      = require('inquirer');
const encryption    = require('../encryption.js');
const fs            = require('fs');
const tmp           = require('tmp');
const child_process = require('child_process');
const exec          = require('child_process').exec;

tmp.setGracefulCleanup(); // Cleanup temporary files even when an uncaught exception occurs

module.exports = {
  command: 'edit <file>',
  describe: 'Edit encrypted file with editor of your choice',
  // builder(yargs) {
  //   yargs.example('hello');
  //   yargs.option('stdin-password', {
  //     alias: 'x',
  //     describe: 'Read password from stdin (NOT IMPLEMENTED)'
  //   });
  // },
  handler(argv) {
    var questions = [
      {
        name: 'password',
        type: 'password',
        message: 'Password',
      }
    ];
    var tmpFile;
    inquirer.prompt(questions).then(userinputs => {
      tmpFile = tmp.fileSync();
      fs.createWriteStream(tmpFile.name)
      encryption.streams.decrypt(
        fs.createReadStream(argv.file),
        fs.createWriteStream(tmpFile.name),
        userinputs.password
      ).then(() => {
        return openEditor(tmpFile.name).catch(console.error);
      }).then(() => {
        return encryption.streams.encrypt(
          fs.createReadStream(tmpFile.name),
          fs.createWriteStream(argv.file),
          userinputs.password
        );
      }).catch(console.error);
    });
  }
};

// function openEditor(filepath) {
//   return new Promise((resolve, reject) => {
//     let editor = child_process.exec('nvim', {stdio: 'inherit'}, (error, stdout, sterr) => {
//       if (error) return reject(error);
//       resolve();
//     });
//   });
// }

function openEditor(filepath) {
  let editor = 'nvim';
  let editorArgs = [
    '-c Goyo',
    '-c WM',
    '-c "set nofoldenable"',
    '+',
    '-c "normal o"',
    '-c "normal o\t"',
    '-c "normal o"',
    '-c "normal o"',
    '-c "normal zt"',
    '+startinsert'
  ];
  editorArgs = [
    '-c',
    'Goyo',
    '-c',
    'WM',
    '-c',
    'set nofoldenable',
    '+',
    '-c',
    'normal o',
    '-c',
    'normal o\\t',
    '-c',
    'normal o',
    '-c',
    'normal o',
    '-c',
    'normal zt',
    '+startinsert'
  ];
  // nvim -c Goyo -c WM -c 'set nofoldenable' + -c 'normal o' -c 'normal o\t' -c 'normal o' -c 'normal o' -c 'normal zt' +startinsert
  return new Promise((resolve, reject) => {
    let editor = child_process.spawn('nvim', [...editorArgs, filepath], {
      stdio: 'inherit'
    });
    editor.on('close', resolve);
    editor.on('error', reject);
  });
}
