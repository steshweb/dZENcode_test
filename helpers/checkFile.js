const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

const checkFile = async(file) => {
  const fileName = file.originalname;

  if (fileName.endsWith('.txt')) {
    try {
      const uniqueFileName = Date.now() + '_' + fileName;
      const sourcePath = file.path;
      const newPath = path.join('storage', uniqueFileName);
      await fs.rename(sourcePath, newPath);
      return newPath;
    }
    catch {
      return null
    }
  }

  if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.gif')) {
    try {
      const uniqueFileName = Date.now() + '_' + fileName;
      const sourcePath = file.path;
      const newPath = path.join('storage', uniqueFileName);

      const image = sharp(sourcePath);

      image.resize(320, 240, {
        fit: 'inside',
      });

      await image.toFile(newPath);
      await fs.unlink(sourcePath);
      return newPath;
    } 
    catch {
      return null;
    }
  }
  return null
}

module.exports = checkFile;
