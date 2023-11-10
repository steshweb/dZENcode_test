const fs = require('fs/promises');
const path = require('path');

const captchaValidate = async (req, res, next) => {
  const captcha = req.body.captcha;
  if (captcha !== '1234') {

    if (req.file) {
      const fileName = req.file.filename;
      const filePath = path.join(__dirname, '..', 'tmp', fileName);

      try {
        await fs.unlink(filePath);
      }
      catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    
    res.status(403).json({ error: 'Wrong captcha' });
  }
  else {
    next();
  }
}

module.exports = captchaValidate;
