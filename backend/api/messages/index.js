const express = require('express');
const router = express.Router();

const { getMessages, writeMessage, removeMessage } = require('./messages-controller');

module.exports = router;

router.get('/', getMessages);
router.post('/', writeMessage);
router.delete('/:id/:directory', removeMessage);
