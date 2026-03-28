const amqp = require('amqplib');
const { Message } = require('../entity/entity');

class RabbitMQRepository {
  constructor(conn, exchangeName) {
    this.conn = conn;
    this.exchangeName = exchangeName;
  }

  async publishMessage(routingKey, message) {
    const ch = await this.conn.createChannel();
    try {
      await ch.assertExchange(this.exchangeName, 'fanout', { durable: true });
      const body = Buffer.from(JSON.stringify(message));
      await ch.publish(this.exchangeName, routingKey, body, { persistent: true });
    } finally {
      await ch.close();
    }
  }
}

function newRabbitMQRepository(conn, exchange) {
  return new RabbitMQRepository(conn, exchange);
}

module.exports = { RabbitMQRepository, newRabbitMQRepository };