const { Message } = require('../../internal/entity/entity');

function sendSms(message) {
  console.log('sending sms ...', message.content);
}

module.exports = { sendSms };