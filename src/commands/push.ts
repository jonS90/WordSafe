import {flags} from '@oclif/command'
import cli from 'cli-ux'
import encryption from '../encryption'
import {openFile, withTempFile, WordsafeCommand, SHARED_FLAGS, makeDateStr, stringToStream} from '../utils'
import * as fs from 'fs'
import CombinedStream from 'combined-stream'

export default class Read extends WordsafeCommand {
  static description = 'Open an empty editor for you to type in and append the contents you type to <file>'

  static examples = [
    '$ wordsafe push encrypted-file\n',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    ...SHARED_FLAGS.editor('vim'),
    'prepend-date-loudly': flags.boolean({char: 'D', description: 'prepend current date before opening file'}),
    'prepend-date-quietly': flags.boolean({char: 'd', description: 'prepend current date after closing file'}),
  }

  static args = [{
    name: 'file',
    required: true,
    description: 'encrypted file',
  }]

  async run() {
    const {args, flags} = this.parse(Read)

    const editor = flags.editor
    const password = await cli.prompt('Password', {type: 'hide'})

    // check that we can decrypt without throwing any error
    await withTempFile(async testFile => {
      await encryption.filenames.decrypt(args.file, testFile, password)
    })

    // open empty file
    await withTempFile(async emptyTmpFile => {
      if (flags['prepend-date-loudly']) {
        fs.writeFileSync(emptyTmpFile, makeDateStr() + '\n')
      }

      await openFile(editor, emptyTmpFile)

      // decrypt real file, and concatenate
      await withTempFile(async decryptedTmpFile => {
        await encryption.filenames.decrypt(args.file, decryptedTmpFile, password)
        const combinedStream = new CombinedStream()
        combinedStream.append(fs.createReadStream(decryptedTmpFile))
        if (flags['prepend-date-quietly']) {
          combinedStream.append(stringToStream(makeDateStr()))
        }
        combinedStream.append(fs.createReadStream(emptyTmpFile))
        await encryption.streams.encrypt(combinedStream as unknown as fs.ReadStream, fs.createWriteStream(args.file), password)
      })
    })
  }
}
