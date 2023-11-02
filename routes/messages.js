const express = require('express');
const router = express.Router();
const addMessage = require('.././controllers/messages.js');

router.post('/', addMessage);

module.exports = router;