Build WCAT commands

Commands:
1- node wcat.js filepath => displays content of the file in the terminal  ✔</br>
2- node wcat.js filepath1 filepath2 filepath3... => displays content of all files in the terminal in (contactinated form) in the given order. ✅</br>
3- node wcat.js -s filepath => convert big line breaks into a singular line break.</br>
4- node wcat.js -n filepath => give numbering to all the lines. </br>
5- node wcat.js -b filepath => give numbering to non-empty lines.</br>
6- node wcat.js -c filepath=> creates a file at the entered path.</br>
7- node wcat.js -e filepath=> puts a '$' sign at the end of each line of the file.</br>
We can mix and match the options.</br>

Edge cases:</br>
1- If file entered is not found then it gives file does not exist error. ✅</br>
2- -n and -b are 2 options which are mutually exclusive so if user types both of them together only the first enter option should work.</br>
3- -s and any or both -n and -b present then -s will be executed first and then -n and -b according second rule.</br>
4- If a non existent filepath is given suceeded by -c flag, the given file is created at that path.</br>
