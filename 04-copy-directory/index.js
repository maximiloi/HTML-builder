const fs = require('node:fs');
const path = require('node:path');

const sourceFolderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

fs.stat(copyFolderPath, (err) => {
  if (!err) {
    fs.rm(copyFolderPath, { recursive: true }, (err) => {
      if (err) throw err;

      copyDir();
    });
  } else {
    copyDir();
  }
});

function copyDir() {
  fs.mkdir(copyFolderPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  
  fs.readdir(sourceFolderPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const sourceFilePath = path.join(sourceFolderPath, file);
      const copyFilePath = path.join(copyFolderPath, file);
      
      fs.copyFile(sourceFilePath, copyFilePath, (err) => {
        if (err) throw err;
      });
    })
  });
}
