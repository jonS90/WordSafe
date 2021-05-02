import {flags} from '@oclif/command'
import cli from 'cli-ux'
import encryption from '../encryption'
import {openFile, withTempFile, WordsafeCommand, SHARED_FLAGS, makeDateStr} from '../utils'
import * as fs from 'fs'

export default class Edit extends WordsafeCommand {
  static description = 'Edit encrypted file with editor of your choice'

  static examples = [
    '$ wordsafe edit encrypted-file\n',
    '$ wordsafe edit encrypted-file --editor=nano\n',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    ...SHARED_FLAGS.editor('vim'),
    ...SHARED_FLAGS.legacyDecrypt,
    'append-date': flags.boolean({description: 'append current date to end of file'}),
  }

  static args = [{
    name: 'file',
    required: true,
    description: 'encrypted file',
  }]

  async run() {
    const {args, flags} = this.parse(Edit)

    const editor = flags.editor
    const password = await cli.prompt('Password', {type: 'hide'})
    await withTempFile(async tmpFile => {
      await encryption.filenames.decrypt(args.file, tmpFile, password, {
        legacyDecryption: flags['legacy-decrypt'],
      })
      if (flags['append-date']) {
        fs.appendFileSync(tmpFile, makeDateStr())
      }
      await openFile(editor, tmpFile)
      await encryption.filenames.encrypt(tmpFile, args.file, password)
    })
  }
}
