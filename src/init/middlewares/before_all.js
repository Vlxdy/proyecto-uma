/* eslint prefer-rest-params: 0 */
/* eslint function-paren-newline: 0 */
/* eslint no-buffer-constructor: 0 */
/* eslint func-names: 0 */
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('../../helpers/logger');

module.exports = (app) => {
  // puerto
  app.set('port', 8081);

  // permite recibir datos json como body
  app.use(bodyParser.json({
    type: 'application/json',
  }));

  // para loguear el request

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
      chunks.push(new Buffer(chunk));
      oldWrite.apply(res, arguments);
    };

    // save last chunk, then parse body
    res.end = function (chunk) {
      if (chunk) {
        chunks.push(new Buffer(chunk));
      }

      let body = Buffer.concat(chunks).toString('utf8');

      // what if there is no response, or is not JSON >_<
      /* eslint no-empty: 0 */
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
      oldEnd.apply(res, arguments);
    };
    next();
  });
  // Para activar pretty print
  app.set('json spaces', 2);

  // adicionando soporte para cors, habilitar ips especificas no dejarlo completamente abierto, los metodos permitidos
  /*
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    headers: 'Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  }));
  */

  // some security headers
  app.use(helmet());
};
