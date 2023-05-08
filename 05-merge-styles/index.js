const fs = require('node:fs');
const path = require('node:path');

const stylePath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');

let bundle = '';

fs.readdir(stylePath, (err, files) => {
  if (err) throw err;
  
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      fs.readFile(path.join(stylePath, file), 'utf8', (err, data) => {
        if (err) throw err;

        bundle += data;

        fs.writeFile(path.join(projectPath, 'bundle.css'), bundle, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});


