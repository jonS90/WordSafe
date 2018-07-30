WordSafe is a simple command line utility that makes it quick and easy to
create, read, and edit encrypted text files.

# Install

```
npm install -g jonsmithers/WordSafe
```

This will also upgrade WordSafe if it's already installed.

# Example Usages

```bash
wordsafe init journal.txt                                    # create a new encrypted file (prompts for password)
wordsafe read journal.txt --editor=vim                       # show encrypted file
wordsafe edit journal.txt --editor=nano                      # edit encrypted file (re-encrypts when editor closes)
wordsafe push journal.txt --editor=vim --prepend-date-loudly # open blank document and append to encrypted file when editor closes
wordsafe help                                                # view main documentation
wordsafe help edit                                           # view documentation on edit command
wordsafe help push                                           # view documentation on push command
wordsafe help read                                           # view documentation on read command
```

# Documentation

WordSafe's help text is dynamically-generated with the
[yargs](https://www.npmjs.com/package/yargs) npm package. Below is `wordsafe --help`, but you can also check out `wordafe help edit`, `wordsafe help push`, and `wordsafe help read`.

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
  read <file>      View encrypted file but don't save changes
  change-password  (NOT IMPLEMENTED)
  change-cipher    (NOT IMPLEMENTED)
  decrypt <file>   Decrypt file to stdout

Options:
  -v, --verbose  Chatty logs                                           [boolean]
  --help         Show help                                             [boolean]

Examples:
  wordsafe init encrypted-file
  wordsafe edit encrypted-file --editor=vim
```
