const amqp = require('amqplib');
const { Message } = require('../entity/entity');
const { sendFcm } = require('../../pkg/notification/fcm');
const { sendSms } = require('../../pkg/notification/sms');
const { sendEmail } = require('../../pkg/notification/email');

class RabbitMQRepository {
  constructor(conn, exchangeName) {
    this.conn = conn;
    this.exchangeName = exchangeName;
  }

  async consumeMessagesFcm(serviceName) {
    const ch = await this.conn.createChannel();
    await ch.assertExchange(this.exchangeName, 'fanout', { durable: true });
    const q = await ch.assertQueue(serviceName, { durable: true });
    await ch.bindQueue(q.queue, this.exchangeName, '');

    ch.consume(q.queue, (msg) => {
      if (msg !== null) {
        try {
          const messageData = JSON.parse(msg.content.toString());
          const message = new Message(messageData.order_id, messageData.user_id, messageData.content, messageData.timestamp);
          console.log(`[${serviceName}] Received message:`, message);
          sendFcm(message);
          ch.ack(msg);
        } catch (err) {
          console.error(`[${serviceName}] Failed to parse message:`, err);
        }
      }
    }, { noAck: false });
  }

  async consumeMessagesSms(serviceName) {
    const ch = await this.conn.createChannel();
    await ch.assertExchange(this.exchangeName, 'fanout', { durable: true });
    const q = await ch.assertQueue(serviceName, { durable: true });
    await ch.bindQueue(q.queue, this.exchangeName, '');

    ch.consume(q.queue, (msg) => {
      if (msg !== null) {
        try {
          const messageData = JSON.parse(msg.content.toString());
          const message = new Message(messageData.order_id, messageData.user_id, messageData.content, messageData.timestamp);
          console.log(`[${serviceName}] Received message:`, message);
          sendSms(message);
          ch.ack(msg);
        } catch (err) {
          console.error(`[${serviceName}] Failed to parse message:`, err);
        }
      }
    }, { noAck: false });
  }

  async consumeMessagesEmail(serviceName) {
    const ch = await this.conn.createChannel();
    await ch.assertExchange(this.exchangeName, 'fanout', { durable: true });
    const q = await ch.assertQueue(serviceName, { durable: true });
    await ch.bindQueue(q.queue, this.exchangeName, '');

    ch.consume(q.queue, (msg) => {
      if (msg !== null) {
        try {
          const messageData = JSON.parse(msg.content.toString());
          const message = new Message(messageData.order_id, messageData.user_id, messageData.content, messageData.timestamp);
          console.log(`[${serviceName}] Received message:`, message);
          sendEmail(message);
          ch.ack(msg);
        } catch (err) {
          console.error(`[${serviceName}] Failed to parse message:`, err);
        }
      }
    }, { noAck: false });
  }
}

function newRabbitMQRepository(conn, exchange) {
  return new RabbitMQRepository(conn, exchange);
}

module.exports = { RabbitMQRepository, newRabbitMQRepository };