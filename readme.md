WordSafe is a simple command line utility that makes it quick and easy to
create, read, and edit encrypted text files.

[![Version](https://img.shields.io/npm/v/wordsafe.svg)](https://npmjs.org/package/wordsafe)

# Install

```
npm install -g jonsmithers/WordSafe
```

This will also upgrade WordSafe if it's already installed.

# Example Usages

```bash
wordsafe init journal.txt                                     # create a new encrypted file (prompts for password)
wordsafe read journal.txt --editor=vim                        # show encrypted file
wordsafe edit journal.txt --editor=nano                       # edit encrypted file (re-encrypts when editor closes)
wordsafe push journal.txt --editor=vim --prepend-date-visibly # open blank document and append to encrypted file when editor closes
wordsafe help                                                 # view main documentation
wordsafe help edit                                            # view documentation on edit command
wordsafe help push                                            # view documentation on push command
wordsafe help read                                            # view documentation on read command
```

<!-- toc -->
* [Install](#install)
* [Example Usages](#example-usages)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wordsafe
$ wordsafe COMMAND
running command...
$ wordsafe (-v|--version|version)
wordsafe/2.1.0 darwin-arm64 node-v15.14.0
$ wordsafe --help [COMMAND]
USAGE
  $ wordsafe COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wordsafe autocomplete [SHELL]`](#wordsafe-autocomplete-shell)
* [`wordsafe edit FILE`](#wordsafe-edit-file)
* [`wordsafe help [COMMAND]`](#wordsafe-help-command)
* [`wordsafe init FILE`](#wordsafe-init-file)
* [`wordsafe push FILE`](#wordsafe-push-file)
* [`wordsafe read FILE`](#wordsafe-read-file)

## `wordsafe autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ wordsafe autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ wordsafe autocomplete
  $ wordsafe autocomplete bash
  $ wordsafe autocomplete zsh
  $ wordsafe autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `wordsafe edit FILE`

Edit encrypted file with editor of your choice

```
USAGE
  $ wordsafe edit FILE

ARGUMENTS
  FILE  encrypted file

OPTIONS
  -e, --editor=editor  [default: vim] open unencrypted file with editor
  -h, --help           show CLI help
  --append-date        append current date to end of file
  --legacy-decrypt

EXAMPLES
  $ wordsafe edit encrypted-file

  $ wordsafe edit encrypted-file --editor=nano
```

_See code: [src/commands/edit.ts](https://github.com/jonsmithers/wordsafe/blob/v2.1.0/src/commands/edit.ts)_

## `wordsafe help [COMMAND]`

display help for wordsafe

```
USAGE
  $ wordsafe help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `wordsafe init FILE`

Set up a new encrypted text file

```
USAGE
  $ wordsafe init FILE

ARGUMENTS
  FILE  encrypted file

EXAMPLE
  $ wordsafe init <file>
```

_See code: [src/commands/init.ts](https://github.com/jonsmithers/wordsafe/blob/v2.1.0/src/commands/init.ts)_

## `wordsafe push FILE`

Open an empty editor for you to type in and append the contents you type to <file>

```
USAGE
  $ wordsafe push FILE

ARGUMENTS
  FILE  encrypted file

OPTIONS
  -D, --prepend-date-visibly  prepend current date before opening file
  -d, --prepend-date          prepend current date after closing file
  -e, --editor=editor         [default: vim] open unencrypted file with editor
  -h, --help                  show CLI help

EXAMPLE
  $ wordsafe push encrypted-file
```

_See code: [src/commands/push.ts](https://github.com/jonsmithers/wordsafe/blob/v2.1.0/src/commands/push.ts)_

## `wordsafe read FILE`

Decrypt contents for perusal (doesn't save changes)

```
USAGE
  $ wordsafe read FILE

ARGUMENTS
  FILE  encrypted file

OPTIONS
  -e, --editor=editor  [default: less] open unencrypted file with editor
  -h, --help           show CLI help
  --legacy-decrypt

EXAMPLES
  $ wordsafe read encrypted-file

  $ wordsafe read encrypted-file --editor=cat
  # ^ this prints decrypted file to stdout
```

_See code: [src/commands/read.ts](https://github.com/jonsmithers/wordsafe/blob/v2.1.0/src/commands/read.ts)_
<!-- commandsstop -->
