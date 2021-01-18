const messagesService = require('./messages-service');

module.exports = {
  getMessages,
  writeMessage,
  removeMessage
}

const user = { email: 'shactal@gmail.com' }; // Mock data

async function getMessages(req, res) {
  try {
    const messages = await messagesService.query(user.email);
    res.send(messages);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).send({ err: 'Cannot get messages' });
  }
};

async function writeMessage(req, res) {
  let message = req.body;
  message = await messagesService.write(message);
  res.send(message);
};

async function removeMessage(req, res) {
  const messageId = req.params.id;
  const directory = req.params.directory;
  await messagesService.remove(messageId, directory);
  res.end();
};