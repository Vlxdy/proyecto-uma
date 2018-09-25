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

  const validarParametrosOperadorPermisos = (params, query) => {
    const parametrosWS = new ParametrosWS();
    if (!params.hasOwnProperty('documentoIdoneidad')) {
      throw new CodeError('El parámetro "documentoIdoneidad" es necesario');
    }
    parametrosWS.body.vNumeroIdoneidad = params.documentoIdoneidad;
    if (!query.hasOwnProperty('pais')) {
      throw new CodeError('El parámetro "pais" es necesario');
    }
    if (/^[0-9]*$/.test(query.pais)) {
      parametrosWS.body.vPaisID = query.pais;
    } else {
      throw new CodeError('El parámetro "pais" solamente puede contener números');
    }
    return parametrosWS;
  };

  const validarParametrosOperadorTramites = (params) => {
    const parametrosWS = new ParametrosWS();
    if (!params.hasOwnProperty('codigoIdentificacion')) {
      throw new CodeError('El parámetro "codigoIdentificacion" es necesario');
    }
    if (/^\d+\/\d+$/.test(params.codigoIdentificacion)) {
      parametrosWS.body.vCodigoItentificacion = params.codigoIdentificacion;
    } else {
      throw new CodeError('El parámetro "codigoIdentificacion" solamente puede contener números seguidos de un "/" seguido de números');
    }
    return parametrosWS;
  };

  const obtenerRepresentantesLegales = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|obtenerRepresentantesLegales] Parametros enviados`, parametrosValidados);
    return operadoresWS.operadorRepresentanteBotic(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|obtenerRepresentantesLegales] Error al consumir el servicio de operadores`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuesta(result);
      logger.debug(`[${__filename}|obtenerRepresentantesLegales] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  const obtenerCapacidadCarga = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|obtenerCapacidadCarga] Parametros enviados`, parametrosValidados);
    return operadoresWS.operadorCapacidadCarga(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|obtenerCapacidadCarga] Error al consumir el servicio de operadores`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuestaCapacidadCarga(result);
      logger.debug(`[${__filename}|obtenerCapacidadCarga] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  const obtenerPermisosComplementarios = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|obtenerPermisosComplementarios] Parametros enviados`, parametrosValidados);
    return operadoresWS.operadorPermisosComplementarios(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|obtenerPermisosComplementarios] Error al consumir el servicio de operadores`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuestaPermisosComplementarios(result);
      logger.debug(`[${__filename}|obtenerPermisosComplementarios] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  const obtenerTramitePermisosComplementarios = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|obtenerTramitePermisosComplementarios] Parametros enviados`, parametrosValidados);
    return operadoresWS.verificacionLlenadoTRE(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|obtenerTramitePermisosComplementarios] Error al consumir el servicio de operadores`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuestaTramitePermisos(result);
      logger.debug(`[${__filename}|obtenerTramitePermisosComplementarios] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  const obtenerOperadores = (callback) => {
    logger.info(`[${__filename}|obtenerOperadores] Parametros enviados`);
    const parametrosWS = new ParametrosWS();
    parametrosWS.url = servicesConfig.wsdlUso;
    return operadoresWS.operadoresAgetic(parametrosWS, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|obtenerOperadores] Error al consumir el servicio de operadores`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuestaOperadores(result);
      logger.debug(`[${__filename}|obtenerOperadores] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  return {
    validarParametrosOperador,
    validarParametrosOperadorPermisos,
    validarParametrosOperadorTramites,
    obtenerRepresentantesLegales,
    obtenerCapacidadCarga,
    obtenerPermisosComplementarios,
    obtenerTramitePermisosComplementarios,
    obtenerOperadores,
  };
};
