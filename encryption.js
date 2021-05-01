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
    decrypt(encryptedFilename, decryptedFilename, password, opts = {}) {
      return encryption.streams.decrypt(fs.createReadStream(encryptedFilename), fs.createWriteStream(decryptedFilename), password, opts);
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
      const cipher = crypto.createCipheriv('aes192', passwordToKey(password), INITIALIZATION_VECTOR);
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
    decrypt(inputStream, outputStream, password, opts = {}) {
      var cipher = opts.legacyDecryption 
        ? crypto.createDecipher('aes192', password)
        : crypto.createDecipheriv('aes-192-cbc', passwordToKey(password), INITIALIZATION_VECTOR);
      inputStream.pipe(cipher).pipe(outputStream);

      return Promise.all([
        streamToPromise(inputStream).catch(e => { throw 'Failed to read file. ' + e.message;}),
        streamToPromise(cipher).catch(e      => { throw 'Failed to decrypt. Bad password? ' + e.message;})
      ]);
    },
  }
};

const INITIALIZATION_VECTOR = new Uint8Array(16);
[
  98, 220,  35,  58,  74,  84,
  5, 199, 224, 202, 232, 232,
  61, 179, 156,   3
].forEach((v, i) => INITIALIZATION_VECTOR[i] = v);
/* function randomInitializationVector() {
 *   const initializationVector = new Uint8Array(16);
 *   crypto.randomFillSync(initializationVector);
 *   return initializationVector;
 * }
 */

function passwordToKey(password/*: string*/)/*: Buffer*/ {
  return crypto.pbkdf2Sync(password, 'salt', 100000, 192/8, 'sha512');
}

module.exports = encryption;
