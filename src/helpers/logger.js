const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'logs.log'),
      handleExceptions: true,
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
      zippedArchive: true,
    }),
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;