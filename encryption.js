const crypto = require('crypto');
const fs = require('fs');
const console = require('./console-wrapper.js');

function promisify(stream) {
  return new Promise((resolve, reject) => {
    stream.on('close', resolve);
    stream.on('error', reject);
  });
}

module.exports = {
  encrypt(inputFile, outputFile, password) {
    var input  = fs.createReadStream(inputFile);
    var cipher = crypto.createCipher('aes192', password);
    var output = fs.createWriteStream(outputFile);
    input.pipe(cipher).pipe(output);
  },
  decrypt(inputFile, outputFile, password) {
    console.log('password', password);
    console.log('outputFile', outputFile);
    console.log('inputFile', inputFile);
    var input  = fs.createReadStream(inputFile);
    var cipher = crypto.createDecipher('aes192', password);
    var output = fs.createWriteStream(outputFile);
    return promisify(input.pipe(cipher).pipe(output));
  }
};
