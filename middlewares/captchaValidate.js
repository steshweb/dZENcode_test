const captchaValidate = (req, res, next) => {
  const captcha = req.body.captcha;
  if (captcha !== '1234') {
    res.status(403).json({ error: 'Wrong captcha' });
  }
  else {
    next();
  }
}

module.exports = captchaValidate;
