const app = require('./server');
const logger = require('../helpers/logger');

const env = process.env.NODE_ENV;

module.exports = () => {
  const port = app.get('port') || 1800;
  const host = '127.0.0.1'; 
  const hostIPv6 = '::1'; 

  app.listen(port, host, () => {
    logger.log('info', `[${env}] Servidor escuchando en ${host}:${port}...`);
  });

  app.listen(port, hostIPv6, () => {
    logger.log('info', `[${env}] Servidor escuchando en ${hostIPv6}:${port}...`);
  });
};