/* eslint prefer-rest-params: 0 */
/* eslint function-paren-newline: 0 */
/* eslint no-buffer-constructor: 0 */
/* eslint func-names: 0 */
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('../../helpers/logger');
const configs = require('../../configs/services');

module.exports = (app) => {

  app.set('port', configs.puerto);


  app.use(bodyParser.json({
    type: 'application/json',
  }));

  app.use((req, res, next) => {
    logger.log('info',
      `[${__filename}][**REQUEST**]`,
      {
        request: {
          headers: req.headers,
          method: req.method,
          url: req.url,
          params: req.params,
          query: req.query,
          body: req.body,
        },
      });
    next();
  });

  app.use((req, response, next) => {
    const res = response;
    const oldWrite = response.write;
    const oldEnd = response.end;
    const chunks = [];

    res.write = function (chunk) {
      chunks.push(Buffer.from(chunk));
      return oldWrite.apply(res, [chunk]);
    };

    res.end = function (chunk) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }

      let body = Buffer.concat(chunks).toString('utf8');

      try {
        body = JSON.parse(body);
      } catch (ex) {
      }

      logger.log('info',
        `[${__filename}][**RESPONSE**]`,
        {
          response: {
            body,
            headers: res._headers,
            statusCode: res.statusCode,
          },
        });
      return oldEnd.apply(res, [chunk]);
    };
    next();
  });

  app.set('json spaces', 2);

  app.use(helmet());
};
