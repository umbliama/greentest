const amqp = require("amqplib");
const logger = require("../../utils/logger");
const RabbitMQService = require("../../utils/rabbitmq-service");

const queueName = "tasks";
const rabbitMQService = new RabbitMQService(queueName);
const resultQueue = "tasks_results";

amqp
  .connect("amqp://127.0.0.1:5672")
  .then((connection) => {
    return connection.createChannel().then((channel) => {
      channel.assertQueue(queueName);

      channel.consume(queueName, async (message) => {
        const task = JSON.parse(message.content);

        try {
          const result = await rabbitMQService.performTask(task);
          channel.assertQueue(resultQueue);
          channel.sendToQueue(resultQueue, Buffer.from(JSON.stringify(result)));
          logger.info("Task processed", { taskId: task.id });
        } catch (error) {
          logger.error("Error processing task", { error });
        } finally {
          channel.ack(message);
        }
      });
      process.on("SIGINT", () => {
        channel.close().then(() => {
          connection.close().then(() => {
            process.exit();
          });
        });
      });
    });
  })
  .catch((err) => {
    logger.error("Error connecting to RabbitMQ:", { error: err });
  });
