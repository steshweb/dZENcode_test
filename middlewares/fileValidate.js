const fs = require('fs');

const fileValidate = (req, res, next) => {

  if(req.file) {

    const fileName = req.file.originalname;
    if (fileName.endsWith('.txt')) {

      if (req.file.size < 100 * 1024) {
        next();
      }
      else {
        fs.unlinkSync(`./tmp/${fileName}`);
        res.status(400).json({ error: 'Txt file size should not be more than 100 kb' })
      }
    }

    else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.gif')) {
      next();
    }

    else {
      fs.unlinkSync(`./tmp/${fileName}`)
      res.status(400)
        .json({ error: 'Unsupported file extensio. Acceptable extensions are txt, png, jpg and gif.' });
    }
  }
  else {
    next();
  }
  
}

module.exports = fileValidate;
