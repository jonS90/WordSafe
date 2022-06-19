import {flags} from '@oclif/command'
import cli from 'cli-ux'
import * as fs from 'fs'
import encryption from '../encryption'
import {openFile, withTempFile, WordsafeCommand, SHARED_FLAGS} from '../utils'

export default class Read extends WordsafeCommand {
  static description = 'Decrypt contents for perusal (doesn\'t save changes)'

  static examples = [
    '$ wordsafe read encrypted-file\n',
    '$ wordsafe read encrypted-file --editor=cat\n# ^ this prints decrypted file to stdout',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    ...SHARED_FLAGS.editor('less'),
    ...SHARED_FLAGS.legacyDecrypt,
    ...SHARED_FLAGS.legacyLegacyDecrypt,
  }

  static args = [{
    name: 'file',
    required: true,
    description: 'encrypted file',
  }]

  async run() {
    const {args, flags} = this.parse(Read)

    const editor = flags.editor
    const password = await cli.prompt('Password', {type: 'hide', required: false})
    await withTempFile(async tmpFile => {
      await encryption.filenames.decrypt(
        args.file,
        tmpFile,
        password,
        {
          legacyDecryption: flags['legacy-decrypt'],
          legacyLegacyDecryption: flags['legacy-legacy-decrypt'],
        }
      )
      fs.chmodSync(tmpFile, 0o400) // make file readonly
      await openFile(editor, tmpFile)
      fs.chmodSync(tmpFile, 0o200)
    })
  }
}
