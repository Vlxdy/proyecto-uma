const soap = require('soap');
const logger = require('../helpers/logger.js');

const opciones = { returnFault: true, forceSoap12Headers: true };

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
  logger.info(`[${__filename}|operadorRepresentanteBotic] Consumiendo representantes legales`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.OperadorRepresentanteBotic(datosConsumo.body, callback);
  });
};
