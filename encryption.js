const crypto          = require('crypto');
const fs              = require('fs');
const streamToPromise = require('stream-to-promise');

function promisify(stream) {
  return new Promise((resolve, reject) => {
    stream.on('close', resolve);
    stream.on('end', resolve);
    stream.on('finish', resolve);
    stream.on('error', reject);
    stream.on('data', () => console.log('data'));
    stream.on('drain', () => console.log('drain'));
    stream.on('pipe', () => console.log('pipe'));
    stream.on('close', () => console.log('close'));
    stream.on('end', () => console.log('end'));
    stream.on('error', () => console.log('error'));
  });
}

const encryption = {
  filenames: {
    decrypt(encryptedFilename, decryptedFilename, password) {
      return encryption.streams.decrypt(fs.createReadStream(encryptedFilename), fs.createWriteStream(decryptedFilename), password);
    },
    encrypt(decryptedFilename, encryptedFilename, password) {
      return encryption.streams.encrypt(fs.createReadStream(decryptedFilename), fs.createWriteStream(encryptedFilename), password);
    }
  },
  streams: {
    encrypt(inputStream, outputStream, password) {
      var cipher = crypto.createCipher('aes192', password);
      inputStream.pipe(cipher).pipe(outputStream);
      return Promise.all([
        streamToPromise(inputStream).catch(e  => { throw 'Failed to read file. ' + e.message;   }),
        streamToPromise(cipher).catch(e       => { throw 'Failed to encrypt. ' + e.message;     }),
        streamToPromise(outputStream).catch(e => { throw 'Failed to write file. ' + e.message; })
      ]);
    },
    decrypt(inputStream, outputStream, password) {
      var cipher = crypto.createDecipher('aes192', password);
      inputStream.pipe(cipher).pipe(outputStream);

      return Promise.all([
        streamToPromise(inputStream).catch(e => { throw 'Failed to read file. ' + e.message;}),
        streamToPromise(cipher).catch(e      => { throw 'Failed to decrypt. Bad password? ' + e.message;})
      ]);
    }
  },
  encrypt(inputFile, outputFile, password) {
    var input  = fs.createReadStream(inputFile);
    var cipher = crypto.createCipher('aes192', password);
    var output = fs.createWriteStream(outputFile);
    input.pipe(cipher).pipe(output);
  },
  decrypt(inputFile, outputFile, password) {
    console.debug('decrypting');
    console.log('password', password);
    console.log('outputFile', outputFile);
    console.log('inputFile', inputFile);
    var input  = fs.createReadStream(inputFile);
    var cipher = crypto.createDecipher('aes192', password);
    var output = fs.createWriteStream(outputFile);
    input.pipe(cipher).pipe(output);
  }
};

module.exports = encryption;
