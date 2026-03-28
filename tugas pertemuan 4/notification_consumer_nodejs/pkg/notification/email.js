const { Message } = require('../../internal/entity/entity');

function sendEmail(message) {
  console.log('sending email ...', message.content);
}

module.exports = { sendEmail };