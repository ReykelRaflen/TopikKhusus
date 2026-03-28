class Message {
  constructor(orderID, userID, content, timestamp) {
    this.orderID = orderID;
    this.userID = userID;
    this.content = content;
    this.timestamp = timestamp;
  }
}

class Response {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

module.exports = { Message, Response };