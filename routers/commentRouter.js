const express = require('express');
const router = express.Router();
const ctrl = require('.././controllers/commentCtrl');
const upload = require('../middlewares/upload');
const captchaValidate = require('../middlewares/captchaValidate');
const fileValidate = require('../middlewares/fileValidate');
const bodyValidate = require('../middlewares/bodyValidate');
const messageValidate = require('../middlewares/messageValidate');

router.post('/comments', upload.single('file'), fileValidate, bodyValidate,  captchaValidate, messageValidate, ctrl.addComment);

router.get('/comments', ctrl.getAllComments);
router.get('/comments/:commentID', ctrl.getCommentById);

module.exports = router;
