g# WordSafe

    `7MMF'     A     `7MF'                  `7MM   .M"""bgd            .d' ""      
      `MA     ,MA     ,V                      MM  ,MI    "Y            dM`         
       VM:   ,VVM:   ,V ,pW"Wq.`7Mb,od8  ,M""bMM  `MMb.      ,6"Yb.   mMMmm.gP"Ya  
        MM.  M' MM.  M'6W'   `Wb MM' "',AP    MM    `YMMNq. 8)   MM    MM ,M'   Yb 
        `MM A'  `MM A' 8M     M8 MM    8MI    MM  .     `MM  ,pm9MM    MM 8M"""""" 
         :MM;    :MM;  YA.   ,A9 MM    `Mb    MM  Mb     dM 8M   MM    MM YM.    , 
          VF      VF    `Ybmd9'.JMML.   `Wbmd"MML.P"Ybmmd"  `Moo9^Yo..JMML.`Mbmmd' 

WordSafe makes it super-easy to work with encrypted text. You can use your favorite text editor and forget about the complicated encryption process.
This is made on Ubuntu, using Ruby 2.1.0.

### non-standard gems used

- parseconfig

### usage

Working with journals
```bash
$ ./wordsafe --new myjournalname
# creates an encrypted template file
```

```bash
$ ./wordsafe myjournalname
# decrypts and opens file in your preffered text editor. Re-encrypts after you close the editor.
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
# creates an encrypted template file
```

```bash
$ ./wordsafe --file --new ~/Desktop/journal.txt
# if "journal.txt" exists, encrypts it as "journal.txt.wordsafe"
# if "journal.txt" does not exist, creates it (encrypted, of course)
```


### to do

- Test the robustness of this program's first launch (when there's no configuration file or app directory). Either create a usable setup wizard, or avoid requiring any setup.

