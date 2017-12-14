const logger = require('../helpers/logger');

function iniciarApp(app, env) {
  const port = app.get('port') || 1800;
  app.listen(port, () => {
    logger.log('info', `[${env}]Servidor escuchando en el puerto  ${port}...`);
  });
}

module.exports = iniciarApp;
