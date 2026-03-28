const express = require('express');
const { loadConfig } = require('./config/config');
const { newRabbitMQConnection } = require('./pkg/rabbitmq/connection');
const { newRabbitMQRepository } = require('./internal/repository/rabbitmq_repo');
const { newMessageUseCase } = require('./internal/usecase/message_usecase');
const { newMessageHandler } = require('./internal/handler/handler');

async function main() {
  // Load config
  const cfg = loadConfig();

  const app = express();
  app.use(express.json());

  // Setup RabbitMQ connection
  const rmqConn = await newRabbitMQConnection(cfg.rabbitMQURL);

  const repo = newRabbitMQRepository(rmqConn, cfg.exchangeName);
  const useCase = newMessageUseCase(repo);
  const handler = newMessageHandler(useCase);

  app.post('/publish', (req, res) => handler.publishMessage(req, res));

  app.listen(cfg.port, () => {
    console.log(`Server running on port ${cfg.port}`);
  });

  process.on('SIGINT', () => {
    console.log('Shutting down...');
    rmqConn.close();
    process.exit(0);
  });
}

main().catch(console.error);