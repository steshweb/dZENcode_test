const Joi = require('joi');

const schema = Joi.object({
  user_name: Joi.string().required(),
  captcha: Joi.string().required(),
  message_text: Joi.string().required(),
  email: Joi.string().required()
    .pattern(new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')),
  parent_id: Joi.number().allow(null).required(),
  home_page: Joi.string()
});

const bodyValidate = (req, res, next) => {

  if(req.file) {
    req.body.parent_id = req.body.parent_id !== 'null' ? parseInt(req.body.parent_id, 10) : null;
  }

  const {error} = schema.validate(req.body);

  if(error) {
    const message = error.details[0].message
    res.status(400).json(message);
  }
  else {
    next();
  }
}

module.exports = bodyValidate;




