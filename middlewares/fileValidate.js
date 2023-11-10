const fs = require('fs/promises');
const path = require('path');

const fileValidate = async (req, res, next) => {

  if (req.file) {

    const fileName = req.file.filename;
    const filePath = path.join(__dirname, '..', 'tmp', fileName);

    if (fileName.endsWith('.txt')) {

      if (req.file.size < 100 * 1024) {
        next();
      }
      else {
        try {
          await fs.unlink(filePath);
          res.status(400).json({ error: 'Txt file size should not be more than 100 kb' })
        }
        catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    }

    else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.gif')) {
      next();
    }

    else {
      try {
        await fs.unlink(filePath);
        res.status(400)
          .json({ error: 'Unsupported file extensio. Acceptable extensions are txt, png, jpg and gif.' });
      }
      catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  else {
    next();
  }
  
}

module.exports = fileValidate;
