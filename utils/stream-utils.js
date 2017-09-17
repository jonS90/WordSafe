const Readable = require('stream').Readable;
module.exports = {
  fromString(str) {
    if (str.slice(-1) !== '\n') {
      str = str + '\n'; // Adhere to POSIX
    }
    var stream = new Readable();
    stream._read = () => {};
    stream.push(str);
    stream.push(null);
    return stream;
    // https://stackoverflow.com/questions/12755997/how-to-create-streams-from-string-in-node-js
  }
};
