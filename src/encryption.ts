import * as crypto from 'crypto'
import * as fs from 'fs'
import streamToPromise from 'stream-to-promise'
import * as stream from 'stream'

const encryption = {
  filenames: {
    decrypt(encryptedFilename: string, decryptedFilename: string, password: string, opts = {}) {
      return encryption.streams.decrypt(fs.createReadStream(encryptedFilename), fs.createWriteStream(decryptedFilename), password, opts)
    },
    encrypt(decryptedFilename: string, encryptedFilename: string, password: string) {
      return encryption.streams.encrypt(fs.createReadStream(decryptedFilename), fs.createWriteStream(encryptedFilename), password)
    },
  },
  streams: {
    encrypt(inputStream: fs.ReadStream | stream.Readable, outputStream: fs.WriteStream, password: string) {
      const cipher = crypto.createCipheriv('aes192', passwordToKey(password), INITIALIZATION_VECTOR)
      inputStream.pipe(cipher).pipe(outputStream)
      return Promise.all([
        streamToPromise(inputStream).catch(error  => {
          throw new Error('Failed to read file. ' + error.message)
        }),
        streamToPromise(cipher).catch(error       => {
          throw new Error('Failed to encrypt. ' + error.message)
        }),
        streamToPromise(outputStream).catch(error => {
          throw new Error('Failed to write file. ' + error.message)
        }),
      ])
    },
    decrypt(inputStream: fs.ReadStream, outputStream: fs.WriteStream, password: string, opts: { legacyDecryption?: boolean } = {}) {
      /* eslint-disable node/no-deprecated-api, no-throw-literal */
      const cipher = opts.legacyDecryption ?
        crypto.createDecipher('aes192', password) :
        crypto.createDecipheriv('aes-192-cbc', passwordToKey(password), INITIALIZATION_VECTOR)
      inputStream.pipe(cipher).pipe(outputStream)

      return Promise.all([
        streamToPromise(inputStream).catch(error => {
          throw 'Failed to read file. ' + error.message
        }),
        streamToPromise(cipher).catch(error      => {
          throw 'Failed to decrypt. Bad password? ' + error.message
        }),
      ])
      /* eslint-enable node/no-deprecated-api no-throw-literal */
    },
  },
}

const INITIALIZATION_VECTOR = new Uint8Array(16);
[
  98,
  220,
  35,
  58,
  74,
  84,
  5,
  199,
  224,
  202,
  232,
  232,
  61,
  179,
  156,
  3,
].forEach((v, i) => {
  INITIALIZATION_VECTOR[i] = v
})
/* function randomInitializationVector() {
 *   const initializationVector = new Uint8Array(16);
 *   crypto.randomFillSync(initializationVector);
 *   return initializationVector;
 * }
 */

function passwordToKey(password: string): Buffer {
  return crypto.pbkdf2Sync(password, 'salt', 100000, 192 / 8, 'sha512')
}

export default encryption
