const { createLogger, transports, format } = require("winston");

const LoggerService = createLogger({
  level: "info",
  format: format.combine(
    format.json(),
    format.timestamp()
  ),
  defaultMeta: { service: "user-email-db" },
  transports: [new transports.File({ filename: "./logs/app.log" })],
});

module.exports = LoggerService