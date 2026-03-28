# Notification Consumer (Node.js)

Migrated version of notification_consumer from Go to Node.js.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env` and configure environment variables if needed.

3. Ensure RabbitMQ is running on `amqp://guest:guest@localhost:5672/`.

## Running

Run each service separately:

- Email consumer: `npm run start:email`
- FCM consumer: `npm run start:fcm`
- SMS consumer: `npm run start:sms`

## Structure

- `config/`: Configuration loading
- `internal/entity/`: Data models
- `internal/repository/`: RabbitMQ repository
- `internal/usecase/`: Business logic
- `pkg/notification/`: Notification senders (placeholders)
- `pkg/rabbitmq/`: RabbitMQ connection
- `cmd/`: Main entry points for each service

## Notes

- Notification functions are placeholders (console.log). Implement actual API calls as needed.
- Uses amqplib for RabbitMQ and dotenv for config.