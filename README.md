# WordSafe

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

Creating files

```bash
$ruby wordsafe --new ~/Desktop/
# creates a text file (encrypted, of course)
```

```bash
$ruby wordsafe --new ~/Desktop/journal.txt
# if "journal.txt" exists, encrypts it as "journal.txt.wordsafe"
# if "journal.txt" does not exist, creates it (encrypted, of course)
```

Opening files

```bash
$ruby wordsafe ~/Desktop/journal.txt.wordsafe
# decrypts and opens file in your preffered text editor. Re-encrypts after you close the editor.
```

```bash
$ruby wordsafe --change-editor pyroom
# use "pyroom" as your text-editor of choice from here on out
```

### to do

- Create a robust way for the script to handle its first launch, creating a new configuration file. Either create a usable setup wizard, or avoid requiring any setup.
- Check to see if there are any problems related to having a different working directory (will it still see the config file?)
- Only unlink the temporary decrypted file when the user is finished editing and closes the editor. Some editors, like Sublime Text or the "xdg-open" command do not block the thread. Figure out away to appropriately delay unlinking the temporary file so you don't slight these non-blocking editors.
- Implement backups, as well as the restore-backup. Backups will go in a .wordsafe directory.
- Add a way to easily place new journals in a ".wordsafe" directory, which can be referred to by name. 
```bash    
    $ ruby wordsafe --new personal          # create journal named "personal"
    $ ruby wordsafe personal                # open/edit "personal"
    $ ruby wordsafe --new creativeThoughts  # create journal named "creativeThoughts"
    $ ruby wordsafe creativeThoughts        # open/edit "creativeThoughts"
```
