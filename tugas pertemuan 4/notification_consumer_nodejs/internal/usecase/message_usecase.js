const { newRabbitMQRepository } = require('../repository/rabbitmq_repo');

class MessageUseCase {
  constructor(repo) {
    this.repo = repo;
  }

  async consumeMessagesSms(serviceName) {
    return this.repo.consumeMessagesSms(serviceName);
  }

  async consumeMessagesFcm(serviceName) {
    return this.repo.consumeMessagesFcm(serviceName);
  }

  async consumeMessagesEmail(serviceName) {
    return this.repo.consumeMessagesEmail(serviceName);
  }
}

function newMessageUseCase(repo) {
  return new MessageUseCase(repo);
}

module.exports = { MessageUseCase, newMessageUseCase };