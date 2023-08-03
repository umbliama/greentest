const amqp = require("amqplib");

class RabbitMQService {
  constructor(queueName) {
    this.queueName = queueName;
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqp.connect("amqp://127.0.0.1:5672");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName);
  }

  async publishTask(task) {
    if (!this.connection) {
      await this.connect();
    }

    this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(task)));
  }

  async performTask(task) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return { task, result: "Выполнено" };
  }

  async closeConnection() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

module.exports = RabbitMQService;
