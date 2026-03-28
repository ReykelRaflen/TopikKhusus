require('dotenv').config();

class Config {
  constructor() {
    this.port = process.env.PORT || '8080';
    this.rabbitMQURL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672/';
    this.exchangeName = process.env.EXCHANGE_NAME || 'notifications';
  }
}

function loadConfig() {
  const cfg = new Config();
  console.log(`Using Exchange: ${cfg.exchangeName}`);
  return cfg;
}

module.exports = { Config, loadConfig };