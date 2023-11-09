const fs = require('fs/promises');
const path = require('path');
const checkMessage = require("../helpers/checkMessage");

const messageValidate = async (req, res, next) => {
  const message = req.body.message_text;
  const validMessage = checkMessage(message);

  if (validMessage) {
    next()
  }

  else {
    if (req.file) {
      const fileName = req.file.filename;
      const filePath = path.join(__dirname, '../', 'tmp', fileName);
      try {
        await fs.unlink(filePath);
      }
      catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    res.status(400).json({ error: 'The message_text is not valid html' });
  }
}

module.exports = messageValidate;






