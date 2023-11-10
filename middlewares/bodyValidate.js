const Joi = require('joi');
const fs = require('fs/promises');
const path = require('path');

const schema = Joi.object({
  user_name: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]+$'))
    .messages({
      'string.pattern.base': 'Invalid characters in user name. Only letters and numbers are allowed.'
    }),
  captcha: Joi.string().required(),
  message_text: Joi.string().required(),
  email: Joi.string().required()
    .pattern(new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'))
    .messages({
      'string.pattern.base': 'Invalid email format'
    }),
  parent_id: Joi.number().allow(null).messages({
    'number.base': 'Only "number" and "null" types are allowed'
  }).required(),
  home_page: Joi.string()
});

const bodyValidate = async (req, res, next) => {
  if(req.file) {
    req.body.parent_id = req.body.parent_id !== 'null' ? parseInt(req.body.parent_id, 10) : null;
  }

  const { error } = schema.validate(req.body);

  if(error) {

    if (req.file) {
      try {
        const fileName = req.file.filename;
        const filePath = path.join('tmp', fileName);
        await fs.unlink(filePath);
      }
      catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    const message = error.details[0].message
    res.status(400).json({ error: message });
  }
  else {
    next();
  }
}

module.exports = bodyValidate;




