const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filename = path.join(__dirname, 'output.txt');

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  if (files.includes('output.txt')) {
    fs.writeFile(filename, '', (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
});

rl.on('SIGINT', () => {
  goodbyeMessage();
});

const getInput = () => {
  rl.question('Enter text to write to the file (type "exit" to quit): ', (input) => {
    if (input === 'exit') {
      goodbyeMessage();
    } else {
      fs.appendFile(filename, input + '\n',(err) => {
        if (err) throw err;
      });
      getInput();
    }
  });
};

const goodbyeMessage = () => {
  console.log('Goodbye!');
  rl.close();
};

getInput();
