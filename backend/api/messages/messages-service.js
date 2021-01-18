const fs = require('fs');
const messages = require('../../data/messages.json');

module.exports = {
  query,
  write,
  remove
}

function query(email) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(messages
        .filter(({ sender, receiver, sender_deleted, receiver_deleted }) =>
          (sender.email === email && !sender_deleted) ||
          (receiver.email === email && !receiver_deleted)
        ));
    }, 1500);
  });
}

function write(message) {
  message._id = _makeId();
  message.creation_date = Date.now();
  messages.unshift(message);
  _saveMessagesToJSON();
  return new Promise(resolve => {
    setTimeout(() => resolve(message), 1500);
  });
}

function remove(messageId, directory) {
  const message = messages.find(({ _id }) => _id === messageId);
  message[directory + '_deleted'] = true;
  _saveMessagesToJSON();
  return new Promise(resolve => {
    setTimeout(resolve, 1500);
  });
}


function _saveMessagesToJSON() {
  fs.writeFileSync('data/messages.json', JSON.stringify(messages, null, 2));
}

function _makeId() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}