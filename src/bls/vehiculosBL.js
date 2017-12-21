const CodeError = require('../errors/code_error');
const vehiculosWS = require('../services/vehiculosWS');
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
    this.url = servicesConfig.wsdlVehiculos;
  }

  const validarParametrosVehiculo = (params) => {
    const parametrosWS = new ParametrosWS();
    if (!params.hasOwnProperty('placa')) {
      throw new CodeError('El parámetro "placa" es necesario');
    }
    if (/^\d+[A-Z]+$/.test(params.placa)) {
      parametrosWS.body.vPlaca = params.placa;
    } else {
      throw new CodeError('El parámetro "placa" solamente puede contener números seguidos de letras mayúsculas');
    }
    if (!params.hasOwnProperty('numeroTarjeta')) {
      throw new CodeError('El parámetro "numeroTarjeta" es necesario');
    }
    if (/^[0-9]*$/.test(params.numeroTarjeta)) {
      parametrosWS.body.vNumeroTarjeta = params.numeroTarjeta;
    } else {
      throw new CodeError('El parámetro "numeroTarjeta" solamente puede contener números');
    }
    return parametrosWS;
  };

  const validarParametrosUltimoVehiculo = (params) => {
    const parametrosWS = new ParametrosWS();
    if (!params.hasOwnProperty('placa')) {
      throw new CodeError('El parámetro "placa" es necesario');
    }
    if (/^\d+[A-Z]+$/.test(params.placa)) {
      parametrosWS.body.vPlaca = params.placa;
    } else {
      throw new CodeError('El parámetro "placa" solamente puede contener números seguidos de letras mayúsculas');
    }
    return parametrosWS;
  };

  const validarParametrosPermisosVehiculo = (params) => {
    const parametrosWS = new ParametrosWS();
    if (!params.hasOwnProperty('codigoVehiculo')) {
      throw new CodeError('El parámetro "codigoVehiculo" es necesario');
    }
    if (/^[0-9]*$/.test(params.codigoVehiculo)) {
      parametrosWS.body.vCodigoIDVehiculos = params.codigoVehiculo;
    } else {
      throw new CodeError('El parámetro "codigoVehiculo" solamente puede contener números');
    }
    return parametrosWS;
  };

  const consultarVehiculosVigentes = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|consultarVehiculosVigentes] Parametros enviados`, parametrosValidados);
    return vehiculosWS.vehiculoVigentes(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|consultarVehiculosVigentes] Error al consumir el servicio de vehículos`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuestaVehiculosVigentes(result);
      logger.debug(`[${__filename}|consultarVehiculosVigentes] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  const consultarUltimaTarjeta = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|consultarUltimaTarjeta] Parametros enviados`, parametrosValidados);
    return vehiculosWS.vehiculoUltimaTarjeta(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|consultarUltimaTarjeta] Error al consumir el servicio de vehículos`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuestaVehiculoUltimaTarjeta(result);
      logger.debug(`[${__filename}|consultarUltimaTarjeta] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  const consultarPermisosComplementarios = (parametrosValidados, callback) => {
    logger.info(`[${__filename}|consultarPermisosComplementarios] Parametros enviados`, parametrosValidados);
    return vehiculosWS.complementariosVehiculos(parametrosValidados, (err, result) => {
      if (err) {
        logger.error(`[${__filename}|consultarPermisosComplementarios] Error al consumir el servicio de vehículos`, err);
        return callback({ mensaje: 'Error al consumir el servicio' });
      }
      const respuesta = parser.obtenerRespuestaComplementariosVehiculos(result);
      logger.debug(`[${__filename}|consultarPermisosComplementarios] Consumo exitoso`, respuesta);
      return callback(err, respuesta);
    });
  };

  return {
    validarParametrosVehiculo,
    validarParametrosUltimoVehiculo,
    validarParametrosPermisosVehiculo,
    consultarVehiculosVigentes,
    consultarUltimaTarjeta,
    consultarPermisosComplementarios,
  };
};
