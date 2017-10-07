WordSafe is a simple cammand line utility that makes it quick and easy to
create, read, and edit encrypted text files.

**Caution**: This project is currently unstable, volatile, and subject to much change at any
moment.

# Install

```
npm install -g jonsmithers/WordSafe#node
```

This will also upgrade WordSafe if it's already installed.

# Documentation

WordSafe's help text is dynamically-generated with the
[yargs](https://www.npmjs.com/package/yargs) npm package:

```
$ wordsafe --help
wordsafe

Usage:
  wordsafe <command> [options]

Description:
  WordSafe makes it practical to decrypt and re-encrypted a plaintext file on a
  regular basis.

Commands:
  init [file]      Set up a new encrypted text file
  edit <file>      Edit encrypted file with editor of your choice
  push <file>      Open an empty editor for you to type in and append the
                   contents you type to <file>
  read <file>      (NOT IMPLEMENTED) Open encrypted file in editor, but don't
                   save any changes made
  change-password  (NOT IMPLEMENTED)
  change-cipher    (NOT IMPLEMENTED)
  decrypt <file>   Decrypt file to stdout

Options:
  -v, --verbose  Chatty logs                                           [boolean]
  --help         Show help                                             [boolean]

Examples:
  wordsafe init
  wordsafe edit <encrypted-file> --editor=vim
```
