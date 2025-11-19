const soap = require("soap");
const logger = require("../helpers/logger.js");
const axios = require("axios");

const opciones = { returnFault: true, forceSoap12Headers: true };

function logData(client) {
  if (client !== undefined) {
    client.on("response", (data) => {
      logger.info("Response", data);
    });

    client.on("request", (data) => {
      logger.info("Request", data);
    });
  } else {
    logger.info("No se ha podido crear el cliente para consumir el servicio");
  }
}

module.exports.vehiculoVigentes = (datosConsumo, callback) => {
  logger.info(
    `[${__filename}|vehiculoVigentes] Consumiendo método de vehículos vigentes de un operador de transporte...`
  );
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = {
      xmlns: client.wsdl.definitions.$targetNamespace,
    };
    client.addSoapHeader(datosConsumo.header);
    return client.VehiculoVigentes(datosConsumo.body, callback, {
      timeout: 5000,
    });
  });
};

module.exports.vehiculoUltimaTarjeta = (datosConsumo, callback) => {
  logger.info(
    `[${__filename}|vehiculoUltimaTarjeta] Consumiendo método de última tarjeta de operación de un operador de transporte...`
  );
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = {
      xmlns: client.wsdl.definitions.$targetNamespace,
    };
    client.addSoapHeader(datosConsumo.header);
    return client.VehiculoUltimaTarjeta(datosConsumo.body, callback, {
      timeout: 5000,
    });
  });
};

module.exports.complementariosVehiculos = (datosConsumo, callback) => {
  logger.info(
    `[${__filename}|complementariosVehiculos] Consumiendo método de vehículos de permisos complementarios de un operador de transporte...`
  );
  return soap.createClient(datosConsumo.url, opciones, (err, client) => {
    logData(client);
    if (err) {
      return callback(err);
    }
    datosConsumo.header.Autenticacion.attributes = {
      xmlns: client.wsdl.definitions.$targetNamespace,
    };
    client.addSoapHeader(datosConsumo.header);
    return client.ComplementariosVehiculos(datosConsumo.body, callback);
  });
};

module.exports.vehiculosAgetic = (url, xml, metodo) => {
  logger.info(`[vehiculosAgetic] Consumiendo método de listado de vehículos..`);
  const endpoint = url.replace("?WSDL", "");
  return axios({
    method: "POST",
    url: endpoint,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: `http://srv.oopp.gob.bo/Public/${metodo}`,
    },
    timeout: 30000,
    data: xml,
  })
    .then((response) => {
      console.log("=== XML RESPONSE RAW ===");
      console.log(response.data); // 👈 NECESITO ESTO
      console.log("========================");
      return response.data;
    })
    .catch((error) => {
      logger.error(`[vehiculosAgetic] Error`, error);
      throw error;
    });
};
