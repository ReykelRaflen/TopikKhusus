const { newRabbitMQRepository } = require('../repository/rabbitmq_repo');

class MessageUseCase {
  constructor(repo) {
    this.repo = repo;
  }

  async publishMessage(routingKey, message) {
    return this.repo.publishMessage(routingKey, message);
  }
}

function newMessageUseCase(repo) {
  return new MessageUseCase(repo);
}

module.exports = { MessageUseCase, newMessageUseCase };