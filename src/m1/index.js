const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const RabbitMQService = require("../../utils/rabbitmq-service");

const rabbitMQService = new RabbitMQService("tasks");

router.post("/tasks", async (req, res) => {
  const task = req.body;

  if (!task.id || !task.title || !task.description) {
    logger.log("error", "400 Bad request");
    return res.status(400).json({ error: "Invalid task data" });
  }

  try {
    await rabbitMQService.publishTask(task);
    logger.info("Task received", { task });
    res.json({ status: "ok", task: task });
  } catch (error) {
    logger.error("Error processing task", { error });
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
