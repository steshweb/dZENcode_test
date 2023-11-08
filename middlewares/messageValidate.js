const checkMessage = require("../helpers/checkMessage");

const messageValidate = (req, res, next) => {
  const message = req.body.message_text;
  const validMessage = checkMessage(message);

  if(validMessage) {
    next()
  }
  else {
    res.status(404).json({ error: 'The message_text is not valid html' });
  }
  
}

module.exports = messageValidate;






