const { Message, Response } = require('../entity/entity');

class MessageHandler {
  constructor(usecase) {
    this.usecase = usecase;
  }

  async publishMessage(req, res) {
    try {
      const { order_id, user_id, content, timestamp } = req.body;
      const message = new Message(order_id, user_id, content, timestamp);

      await this.usecase.publishMessage('notifications', message);

      res.status(200).json(new Response(200, 'Message published successfully'));
    } catch (err) {
      console.error('Failed to publish message:', err);
      res.status(500).json(new Response(500, 'Failed to publish message'));
    }
  }
}

function newMessageHandler(usecase) {
  return new MessageHandler(usecase);
}

module.exports = { MessageHandler, newMessageHandler };