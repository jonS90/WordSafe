
    `7MMF'     A     `7MF'                  `7MM   .M"""bgd            .d' ""      
      `MA     ,MA     ,V                      MM  ,MI    "Y            dM`         
       VM:   ,VVM:   ,V ,pW"Wq.`7Mb,od8  ,M""bMM  `MMb.      ,6"Yb.   mMMmm.gP"Ya  
        MM.  M' MM.  M'6W'   `Wb MM' "',AP    MM    `YMMNq. 8)   MM    MM ,M'   Yb 
        `MM A'  `MM A' 8M     M8 MM    8MI    MM  .     `MM  ,pm9MM    MM 8M"""""" 
         :MM;    :MM;  YA.   ,A9 MM    `Mb    MM  Mb     dM 8M   MM    MM YM.    , 
          VF      VF    `Ybmd9'.JMML.   `Wbmd"MML.P"Ybmmd"  `Moo9^Yo..JMML.`Mbmmd' 

WordSafe makes it super-easy to store and retrieve bits of encrypted text. You can use your favorite text editor and forget about the encryption process. It's the perfect tool for keeping a secure repository of ideas or journal entries.

This is made on Ubuntu, using Ruby 2.1.0. Compatible with Linux and Mac.

### Install now

```bash
$ curl http://jonathansmithers.com/wordsafe/install.sh | sh
```

### Usage examples

Working with journals
```bash
$ ./wordsafe --new myjournalname
# initializes an encrypted journal in ~/.wordsafe
```

```bash
$ ./wordsafe myjournalname
# decrypts and opens journal in your prefered text editor. Re-encrypts after you close the editor.
```

```bash
$ ./wordsafe --change-password myjournalname
```
Configuring

```bash
$ ruby wordsafe --change-editor pyroom
# use "pyroom" as your text-editor of choice from here on out
```

Specifying full filepaths

```bash
$ ./wordsafe --file --new ~/Desktop/
# initializes an encrypted journal called "journal"
$ ./wordsafe --file --new ~/Desktop/journal.txt
# if "journal.txt" exists, encrypts it as "journal.txt.wordsafe"
# if "journal.txt" does not exist, creates it (encrypted, of course)
```

```bash
$ ./wordsafe --file ~/Desktop/journal
# decrypts and opens file in your preferred text editor. Re-encrypts after you close the editor.
```

Backing up journals
```bash
$ ./wordsafe --backup myjournalname
# backs up to ~/.wordsafe/{timestamp} {filename}
```

Automatically append today's date
```bash
$ ./wordsafe --append-date myjournalname
# appends timestamp to decrypted journal before opening
```


### to do

- Make this robust to files that aren't pure text. 
