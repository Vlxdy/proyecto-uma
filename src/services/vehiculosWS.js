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

module.exports.vehiculoVigentes = (datosConsumo, callback) => {
  logger.info(`[${__filename}|vehiculoVigentes] Consumiendo método de vehículos vigentes de un operador de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.VehiculoVigentes(datosConsumo.body, callback, { timeout: 5000 });
  });
};

module.exports.vehiculoUltimaTarjeta = (datosConsumo, callback) => {
  logger.info(`[${__filename}|vehiculoUltimaTarjeta] Consumiendo método de última tarjeta de operación de un operador de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.VehiculoUltimaTarjeta(datosConsumo.body, callback, { timeout: 5000 });
  });
};

module.exports.complementariosVehiculos = (datosConsumo, callback) => {
  logger.info(`[${__filename}|complementariosVehiculos] Consumiendo método de vehículos de permisos complementarios de un operador de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.ComplementariosVehiculos(datosConsumo.body, callback);
  });
};

module.exports.vehiculosAgetic = (datosConsumo, callback) => {
  logger.info(`[${__filename}|VehiculosAgetic] Consumiendo método de listado de vehículos...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.VehiculosAgetic(datosConsumo.body, callback);
  });
};
