const { Message } = require('../../internal/entity/entity');

function sendFcm(message) {
  console.log('sending fcm ...', message.content);
}

module.exports = { sendFcm };