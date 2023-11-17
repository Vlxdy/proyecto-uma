const logger = require('../helpers/logger');

function iniciarApp(app, env) {
 
  const port = app.configurations.config.services.puerto; 
  const host = '127.0.0.1'; 
  const hostIPv6 = '::1'; 

  app.listen(port, host, () => {
    logger.log('info', `[${env}] Servidor escuchando en ${host}:${port}...`);
  });
  app.listen(port, hostIPv6, () => {
    logger.log('info', `[${env}] Servidor escuchando en ${hostIPv6}:${port}...`);
  });
  
}

module.exports = iniciarApp;
