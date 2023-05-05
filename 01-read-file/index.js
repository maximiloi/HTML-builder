// 1
const fs = require('fs');
const path = require('node:path');

const stream = fs.createReadStream(path.join(__dirname, '/text.txt'), 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));


// 2
// const { stdout } = process;
// const fs = require('fs');
// const path = require('path');

// fs.readFile(
//   path.join(__dirname, 'text.txt'),
//   'utf-8',
//   (err, data) => {
//       if (err) throw err;
//       stdout.write(data);
//   }
// );


// 3
// const fs = require('fs');
// const path = require('path');

// fs.readFile(
//   // path.join(__dirname, './text.txt'),
//   // path.join(__dirname, '/text.txt'),  нет разницы в macOs
//   path.join(__dirname, 'text.txt'),
//   'utf-8',
//   (err, data) => {
//       if (err) throw err;
//       console.log(data);
//   }
// );