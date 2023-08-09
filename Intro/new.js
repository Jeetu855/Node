//console.log('Hello from node');

const fs = require('fs');

// fs.writeFileSync , 1st arg= path of file, 2nd arg= contents of file

fs.writeFileSync('../hello.txt', 'Hello from nodejs file system module');
// go to previous directory and write in file hello.txt, if hello.txt
// does not exist, create it first then write in it

fs.writeFileSync('hello.txt', 'Hello from nodejs file system module');
//write in hello.txt in current folder
