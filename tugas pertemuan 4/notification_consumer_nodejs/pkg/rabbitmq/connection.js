const amqp = require('amqplib');

async function newRabbitMQConnection(url) {
  try {
    const conn = await amqp.connect(url);
    return conn;
  } catch (err) {
    console.error('Failed to connect to RabbitMQ:', err);
    throw err;
  }
}

module.exports = { newRabbitMQConnection };