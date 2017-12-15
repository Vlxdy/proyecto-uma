const CodeError = require('../errors/code_error');
const operadoresWS = require('../services/operadoresWS');
const logger = require('../helpers/logger');
const parser = require('../helpers/parser');

module.exports = (app) => {
  const servicesConfig = app.configurations.config.services;

  function ParametrosWS() {
    this.body = {};
    this.header = {
      Autenticacion: {},
    };
    this.header.Autenticacion.UsuarioNombre = servicesConfig.usuario;
    this.header.Autenticacion.UsuarioClave = servicesConfig.clave;
    this.url = servicesConfig.wsdl;
  }

  const validarParametrosOperador = (params, query) => {
    const parametrosWS = new ParametrosWS();
    if (!params.hasOwnProperty('nit')) {
      throw new CodeError('El parámetro "nit" es necesario');
    }
    if (/^[0-9]*$/.test(params.nit)) {
      parametrosWS.body.vNit = params.nit;
    } else {
      throw new CodeError('El parámetro "nit" solamente puede contener números');
    }
    if (!query.hasOwnProperty('numeroRegistro')) {
      throw new CodeError('El parámetro "numeroRegistro" es necesario');
    }
    if (/^[0-9]*$/.test(query.numeroRegistro)) {
      parametrosWS.body.vNumeroRegistro = query.numeroRegistro;
    } else {
      throw new CodeError('El parámetro "numeroRegistro" solamente puede contener números');
    }
    return parametrosWS;
  };

  const obtenerRepresentantesLegales = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|obtenerRepresentantesLegales] Parametros enviados`, parametrosValidados);
    return operadoresWS.operadorRepresentanteBotic(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|obtenerRepresentantesLegales] Error al consumir el servicio de operadores`, err);
        return callback({ error: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuesta(result);
      logger.debug(`[${__filename}|obtenerRepresentantesLegales] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  return {
    validarParametrosOperador,
    obtenerRepresentantesLegales,
  };
};
