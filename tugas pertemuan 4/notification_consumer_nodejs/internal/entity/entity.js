class Message {
  constructor(orderID, userID, content, timestamp) {
    this.orderID = orderID;
    this.userID = userID;
    this.content = content;
    this.timestamp = timestamp;
  }
}

module.exports = { Message };