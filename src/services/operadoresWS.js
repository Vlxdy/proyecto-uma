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
  logger.info(`[${__filename}|operadorRepresentanteBotic] Consumiendo método de representantes legales de un operador de transporte...`);
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

module.exports.operadorCapacidadCarga = (datosConsumo, callback) => {
  logger.info(`[${__filename}|operadorCapacidadCarga] Consumiendo método de capacidad de carga de un operador de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.OperadorCapacidadCarga(datosConsumo.body, callback);
  });
};

module.exports.operadorPermisosComplementarios = (datosConsumo, callback) => {
  logger.info(`[${__filename}|operadorPermisosComplementarios] Consumiendo método de permisos complementarios de un operador de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.OperadorPermisosComplementarios(datosConsumo.body, callback);
  });
};

module.exports.verificacionLlenadoTRE = (datosConsumo, callback) => {
  logger.info(`[${__filename}|verificacionLlenadoTRE] Consumiendo método de trámites de permisos complementarios de un operador de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.VerificacionLlenadoTRE(datosConsumo.body, callback);
  });
};

module.exports.operadoresAgetic = (datosConsumo, callback) => {
  logger.info(`[${__filename}|operadoresAgetic] Consumiendo método de listado de operadores de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.OperadoresAgetic(datosConsumo.body, callback);
  });
};

module.exports.OperadoresRegistroAgetic = (datosConsumo, callback) => {
  logger.info(`[${__filename}|OperadoresRegistroAgetic] Consumiendo método de listado de operadores de transporte...`);
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = { xmlns: client.wsdl.definitions.$targetNamespace };
    client.addSoapHeader(datosConsumo.header);
    return client.OperadoresRegistroAgetic(datosConsumo.body, callback);
  });
};
