const { loadConfig } = require('../../config/config');
const { newRabbitMQConnection } = require('../../pkg/rabbitmq/connection');
const { newRabbitMQRepository } = require('../../internal/repository/rabbitmq_repo');
const { newMessageUseCase } = require('../../internal/usecase/message_usecase');

async function main() {
  // Load config
  const cfg = loadConfig();

  // Setup RabbitMQ connection
  const rmqConn = await newRabbitMQConnection(cfg.rabbitMQURL);

  const serviceName = 'SMS';
  console.log(`[${serviceName}] Listening for messages...`);

  const repo = newRabbitMQRepository(rmqConn, cfg.exchangeName);
  const useCase = newMessageUseCase(repo);

  // Consume messages
  await useCase.consumeMessagesSms(serviceName);

  // Keep the process running
  process.on('SIGINT', () => {
    console.log('Shutting down...');
    rmqConn.close();
    process.exit(0);
  });
}

main().catch(console.error);