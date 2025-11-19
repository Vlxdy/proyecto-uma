const logger = require('../../helpers/logger');

module.exports = (app) => {
  app.use((req, res) => {
    res.status(461).json({
      mensaje: 'La ruta o el verbo utilizado no existen.',
    });
  });
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    logger.error(`[${__filename}] error`, { errorMessage: err.message, errorStack: err.stack });
    res.status(err.httpCode || 500).send({ mensaje: err.message });
  });
};
