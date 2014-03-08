# WordSafe

    `7MMF'     A     `7MF'                  `7MM   .M"""bgd            .d' ""      
      `MA     ,MA     ,V                      MM  ,MI    "Y            dM`         
       VM:   ,VVM:   ,V ,pW"Wq.`7Mb,od8  ,M""bMM  `MMb.      ,6"Yb.   mMMmm.gP"Ya  
        MM.  M' MM.  M'6W'   `Wb MM' "',AP    MM    `YMMNq. 8)   MM    MM ,M'   Yb 
        `MM A'  `MM A' 8M     M8 MM    8MI    MM  .     `MM  ,pm9MM    MM 8M"""""" 
         :MM;    :MM;  YA.   ,A9 MM    `Mb    MM  Mb     dM 8M   MM    MM YM.    , 
          VF      VF    `Ybmd9'.JMML.   `Wbmd"MML.P"Ybmmd"  `Moo9^Yo..JMML.`Mbmmd' 

WordSafe makes it super-easy to work with encrypted text. You can use your favorite text editor and forget about the complicated encryption process.
This is made on Ubuntu, using ruby 2.1.0.

### non-standard gems used

- parseconfig

### to do

- Shred the temporary file when the user is done editing it.
- Create a robust way for the script to handle its first launch, creating a new configuration file. Either create a usable setup wizard, or avoid requiring any setup.
- Only unlink the temporary decrypted file when the user is finished editing and closes the editor. Some editors, like Sublime Text or the "xdg-open" command do not block the thread. Figure out away to appropriately delay unlinking the temporary file so you don't slight these non-blocking editors.
- Implement backups, as well as the restore-backup. Backups will go in a .wordsafe directory.
- Add a way to easily place new journals in a ".wordsafe" directory, which can be referred to by name. 
```bash    
    $ ruby wordsafe --new personal
    $ ruby wordsafe personal
    $ ruby wordsafe --new creativeThoughts
    $ ruby wordsafe creativeThoughts
```

