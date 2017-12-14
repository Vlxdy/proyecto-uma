/* eslint global-require: 0 */
const winston = require('winston');
const fs = require('fs');
const path = require('path');

winston.emitErrs = true;

if (!fs.existsSync(path.join(__dirname, '../../logs'))) {
  fs.mkdirSync(path.join(__dirname, '../../logs'));
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: path.join(__dirname, '../../logs/logs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 10,
      colorize: false,
      zippedArchive: true,
      showLevel: true,
    }),
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      json: true,
      colorize: true,
      prettyPrint: true,
      humanReadableUnhandledException: true,
    }),
    /*
    new winston.transports.Http({
      host: '192.168.27.237',
      port: '8080',
    }),
    */
  ],
  exitOnError: false,
});

const env = process.env.NODE_ENV;

if (env !== 'test') {
  logger.rewriters.push((level, msg, metaParam) => {
    let meta = metaParam;
    if (typeof (metaParam) === 'object') {
      meta = JSON.parse(JSON.stringify(metaParam));
    } else {
      meta = {
        dato: metaParam,
      };
    }
    meta.timestamp = new Date();
    meta.appName = require('../../package.json').name;
    return meta;
  });
}

if (env !== 'development' && env !== undefined) {
  logger.remove(winston.transports.Console);
}

module.exports = logger;
