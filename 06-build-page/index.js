const { mkdir, readFile, readdir, copyFile } = require('node:fs/promises');
const { writeFile, stat, rm } = require('node:fs');
const path = require('node:path');

const projectDirectoryPath = path.join(__dirname, 'project-dist');
const projectAssetsPath = path.join(projectDirectoryPath, 'assets');

const templateFilePath = path.join(__dirname, 'template.html');
const componentsDirectoryPath = path.join(__dirname, 'components');
const stylesDirectoryPath = path.join(__dirname, 'styles');
const assetsDirectoryPath = path.join(__dirname, 'assets');

async function makeProjectDirectory() {
  await mkdir(projectDirectoryPath, {recursive: true});
}

async function compilationHTML() {
  try {
    let templateContents = await readFile(templateFilePath, { encoding: 'utf8',});
    
    const componentsFiles = await readdir(componentsDirectoryPath);
    for (const file of componentsFiles) {
      const fileExt = path.parse(path.join(componentsDirectoryPath, file)).ext;
      const fileName = path.parse(path.join(componentsDirectoryPath, file)).name;
      const componentsContents = await readFile(path.join(componentsDirectoryPath, file), { encoding: 'utf8',});
      
      if (fileExt == '.html') {
        templateContents = templateContents.replace(`{{${fileName}}}`, componentsContents);
      }
    }
    
    writeFile(path.join(projectDirectoryPath, 'index.html'), templateContents, (err) => {
      if (err) throw err;
      console.log('CompilationHTML done');
    });
  } catch (error) {
    console.error(error);
  }
}

async function compilationCSS() {
  try {
    const stylesFiles = await readdir(stylesDirectoryPath);
    let totalStyles = '';
    for (const file of stylesFiles) {
      const componentsContents = await readFile(path.join(stylesDirectoryPath, file), { encoding: 'utf8',});
      totalStyles += `${componentsContents}\n`;
    }

    writeFile(path.join(projectDirectoryPath, 'style.css'), totalStyles, (err) => {
      if (err) throw err;
      console.log('CompilationCSS done');
    });
  } catch (error) {
    console.error(error);
  }
}

async function copyAssets() {
  try {
    const assetsElements = await readdir(assetsDirectoryPath, { withFileTypes: true });

    for (const element of assetsElements) {
      const srcFilePath = path.join(assetsDirectoryPath, element.name);
      const destFilePath = path.join(projectDirectoryPath, element.name);

      if (element.isFile()) {
        await copyFile(srcFilePath, destFilePath);
      } else {
        const assetsPaths = await readdir(srcFilePath, { withFileTypes: true });
        await mkdir(path.join(projectAssetsPath, element.name), {recursive: true});

        for (const assetsElement of assetsPaths) {
          const srcAssetsFilePath = path.join(srcFilePath, assetsElement.name);
          const destAssetsFilePath = path.join(projectAssetsPath, element.name, assetsElement.name);

          await copyFile(srcAssetsFilePath, destAssetsFilePath);
        }
      }
    }
    console.log('Copy Directory assets done');
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  makeProjectDirectory();
  compilationHTML();
  compilationCSS();
  copyAssets();
}

stat(projectDirectoryPath, (err) => {
  if (!err) {
    rm(projectDirectoryPath, { recursive: true }, (err) => {
      if (err) throw err;

      init();
    });
  } else {
    init();
  }
});