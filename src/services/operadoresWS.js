const soap = require('soap');
const logger = require('../helpers/logger.js');

const opciones = {};

function logData(client) {
  if (client !== undefined) {
    client.on('response', (data) => {
      logger.info('Response', data);
    });

    client.on('request', (data) => {
      logger.info('Request', data);
    });
  } else {
    logger.info('No se ha podido crear el cliente para consumir el servicio');
  }
}

module.exports.operadorRepresentanteBotic = (datosConsumo, callback) => {
  soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    return client.OperadorRepresentanteBotic(datosConsumo.args, callback);
  });
};
