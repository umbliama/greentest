const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),

    new transports.File({
      filename: "./logs/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "./logs/combined.log",
      level: "info",
      format: format.json(),
    }),
  ],
});
module.exports = logger;
