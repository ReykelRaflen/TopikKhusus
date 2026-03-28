# Notification Publisher (Node.js)

Migrated version of notification_publisher from Go to Node.js.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env` and configure environment variables if needed.

3. Ensure RabbitMQ is running on `amqp://guest:guest@localhost:5672/`.

## Running

Start the server:
```bash
npm start
```

The server will run on port 8080 (configurable via .env).

## API

- POST `/publish`: Publish a message to RabbitMQ.

  Request body:
  ```json
  {
    "order_id": "123",
    "user_id": "user1",
    "content": "Notification content",
    "timestamp": "2023-01-01T00:00:00Z"
  }
  ```

  Response:
  ```json
  {
    "code": 200,
    "message": "Message published successfully"
  }
  ```

## Structure

- `config/`: Configuration loading
- `internal/entity/`: Data models (Message, Response)
- `internal/repository/`: RabbitMQ repository
- `internal/usecase/`: Business logic
- `internal/handler/`: HTTP handlers
- `pkg/rabbitmq/`: RabbitMQ connection
- `main.js`: Entry point

## Notes

- Uses Express for HTTP server, amqplib for RabbitMQ, dotenv for config.