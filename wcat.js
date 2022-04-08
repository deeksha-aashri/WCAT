

// Comments in the code are to make it comprehensive.
// node wcat.js filepath => displays the content of the file on the terminal.
// node wcat.js filepath1 filepath2 filepath3 => dispalys the content of these three files on the terminal.

const fs = require("fs");

let inputArr = process.argv.slice(2);
//console.log(inputArr);
let filesArr = [];
let optionsArr = [];
let contentArr = "";
let content = "";
let finalOption = "";
// All the filepaths have now filled the inputArr so, we are looking at the first character of filepath to see if it is an option. 
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    //console.log(firstChar);
    if (firstChar == '-') {
        optionsArr.push(inputArr[i]);
    }
    else {
        filesArr.push(inputArr[i]);
    }
}

//console.log(filesArr);
//console.log(optionsArr);
let indexofN = optionsArr.indexOf("-n");
let indexofB = optionsArr.indexOf("-b");
let indexOfC = optionsArr.indexOf("-c"); // Now .indexOf returns the index if found otherwise it returns -1.
let indexOfE=optionsArr.indexOf("-e");
if (indexofN != -1 && indexofB != -1) {   // This loop rules out the edge cases wherein suppose, [-s -n] is given index of s is 0  and of n is 1 but for b index=-1 is returned so here -1<1 therefore, finalOption=-b which is wrong 
    if (indexofN < indexofB) {
        finalOption = "-n";
    }
    else if(indexofB<indexofN) {
        finalOption = "-b";
    }
   
}
else if(indexOfC!=-1) {
    finalOption = "-c";
}
else if(indexOfE!=-1){
    finalOption='-e'
}
// If either of -b or -n is present then 
else {
    if (indexofB != -1) {
        finalOption = '-b';
    }
    else if (indexofN != -1) {
        finalOption = '-n';
    }
   
   
}

//==============================================> Now we check if all the filepaths are present
if (finalOption != "-c") {
    for (let i = 0; i < filesArr.length; i++) {
        let doesExist = fs.existsSync(filesArr[i]);
        if (!doesExist) {
            console.log(" One or more file(s) do not exist.");
            return;
        }
    }
//=============================================> Now we start reading the files and appending them.

    for (let i = 0; i < filesArr.length; i++) {
        let fileContent = fs.readFileSync(filesArr[i]);
        content += fileContent + "\r\n";
    }
    contentArr = content.split("\r\n");
}
//console.table(contentArr);
//===================================> Now we check an option (-s) has been given as input. This option should remove extra lines
let tempArr = [];
let isSPresent = optionsArr.includes("-s");
if (isSPresent) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    //console.table(contentArr);
 }
// Push everything in tempArr except null
for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != null) {
        tempArr.push(contentArr[i]);
    }
}

//console.log("after removing extra lines \n" ,tempArr);
contentArr = tempArr; 
console.log(contentArr);
// Because we have used .includes ("-s") so the first options that is searched is -s and will be executed at first.So, we need to update our contentArr as the one we have gotten after -s
//===========================> Now we write a code that deals with -n and -b options


//console.log("finalOption = ", finalOption);
if (finalOption == "-n") {
   console.log( modifyContentByN());
}
else if (finalOption == "-b") {
   console.log( modifyContentByB());
}
else if (finalOption == "-c") {
    console.log("The file has been created.")
    createFile(filesArr[0]);
}
else if(finalOption=='-e'){
    for(let i=0;i<contentArr.length;i++){
        console.log(contentArr[i]+='$');
    }
    
}
//=========================================> function which writes numbers in front of all lines.
function modifyContentByN() {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = (i + 1) + ")" + contentArr[i];
        console.log(contentArr);
    }
}
//=========================================> function which  writes numbers in front of non-empty lines. 
function modifyContentByB() {
    let count = 1;
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            contentArr[i] = count + ") " + contentArr[i];
            count++;
        }
        console.log(contentArr);
    }
}
//======================================> function which creates a file upon encountering -c 
function createFile(fileName) {
    let exist = fs.existsSync(fileName);
    if (!exist) {
        fs.writeFileSync(fileName, "");
    }
    
}

//console.log(contentArr);