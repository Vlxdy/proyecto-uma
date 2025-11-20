const logger = require("../helpers/logger.js");
const axios = require("axios");

const callSoapAction = (url, xml, metodo) => {
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
      console.log("XXXXXXXXXXXXXXXXXXXX>",response);
      
      return response.data})
    .catch((error) => {
      logger.error(`[${metodo}] Error`, error);
      console.log("Error - XXXXXXXXXXXXXXXXXXXX>",response);

      throw error;
    });
};

module.exports.vehiculosVigentes = (url, xml, metodo) => {
  logger.info(
    `[${__filename}|vehiculosVigentes] Consumiendo método de vehículos vigentes de un operador de transporte...`
  );
  return callSoapAction(url, xml, metodo);
};

module.exports.vehiculoUltimaTarjeta = (url, xml, metodo) => {
  logger.info(
    `[${__filename}|vehiculoUltimaTarjeta] Consumiendo método de última tarjeta de operación de un operador de transporte...`
  );
  return callSoapAction(url, xml, metodo);
};

module.exports.complementariosVehiculos = (url, xml, metodo) => {
  logger.info(
    `[${__filename}|complementariosVehiculos] Consumiendo método de vehículos de permisos complementarios de un operador de transporte...`
  );
  return callSoapAction(url, xml, metodo);
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
