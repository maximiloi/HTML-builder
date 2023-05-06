const fs = require('node:fs');
const path = require('node:path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) =>{
      if (err) throw err;
      
      if (stats.isFile()) {
        const pathParse = path.parse(filePath);
        const nameFile = pathParse.name;
        const extensionFile = pathParse.ext.substring(1);
        const sizeFile = (stats.size / 1024).toFixed(3);

        console.log(`${nameFile} - ${extensionFile} - ${sizeFile}kb`);
      }
    });
  });
});