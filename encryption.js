const crypto          = require('crypto');
const fs              = require('fs');
const streamToPromise = require('stream-to-promise');

const encryption = {
  filenames: {
    /**
     * @param {string} encryptedFilename
     * @param {string} decryptedFilename
     * @param {string} password
     */
    decrypt(encryptedFilename, decryptedFilename, password) {
      return encryption.streams.decrypt(fs.createReadStream(encryptedFilename), fs.createWriteStream(decryptedFilename), password);
    },
    /**
     * @param {string} encryptedFilename
     * @param {string} decryptedFilename
     * @param {string} password
     */
    encrypt(decryptedFilename, encryptedFilename, password) {
      return encryption.streams.encrypt(fs.createReadStream(decryptedFilename), fs.createWriteStream(encryptedFilename), password);
    }
  },
  streams: {
    /**
     * @param {ReadStream} inputStream
     * @param {WriteStream} outputStream
     * @param {string} password
     */
    encrypt(inputStream, outputStream, password) {
      var cipher = crypto.createCipher('aes192', password);
      inputStream.pipe(cipher).pipe(outputStream);
      return Promise.all([
        streamToPromise(inputStream).catch(e  => { throw 'Failed to read file. ' + e.message;   }),
        streamToPromise(cipher).catch(e       => { throw 'Failed to encrypt. ' + e.message;     }),
        streamToPromise(outputStream).catch(e => { throw 'Failed to write file. ' + e.message; })
      ]);
    },
    /**
     * @param {ReadStream} inputStream
     * @param {WriteStream} outputStream
     * @param {string} password
     */
    decrypt(inputStream, outputStream, password) {
      var cipher = crypto.createDecipher('aes192', password);
      inputStream.pipe(cipher).pipe(outputStream);

      return Promise.all([
        streamToPromise(inputStream).catch(e => { throw 'Failed to read file. ' + e.message;}),
        streamToPromise(cipher).catch(e      => { throw 'Failed to decrypt. Bad password? ' + e.message;})
      ]);
    }
  }
};

module.exports = encryption;
