const logger = require('../helpers/logger');
const props = require('../../package.json');

/**
* @apiDefine vehiculos Api de la USO Vehículos
*/

module.exports = (app) => {
  const { config } = app.configurations;
  const { vehiculosBL } = app.bls;

  /**
   * @api {get} <base-url>/v<version-servicio>/vehiculos/:placa/tarjetas/:numeroTarjeta Tarjetas
   * @apiDescription Proporciona los datos de los vehículos vigentes de un operador de transporte
   * @apiName consultarTarjetas
   * @apiGroup vehiculos
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {String} placa Número de la placa asignado por el RUAT.
   * @apiParam {Integer} numeroTarjeta Número de tarjeta de operación del operador de transporte.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {String} estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} tipoTarjeta Categoría de la tarjeta.
   * @apiSuccess {String} nit Número de identificación tributaria.
   * @apiSuccess {String} numeroRegistro Número de BOTIC del operador de transporte asignado por el VMT.
   * @apiSuccess {String} color Color del vehículo.
   * @apiSuccess {String} marca Marca del vehículo.
   * @apiSuccess {String} modelo Año de fabricación del vehículo.
   * @apiSuccess {String} chasis Número de chasis del vehículo.
   * @apiSuccess {String} capacidadCarga Capacidad de carga expresada en toneladas.
   * @apiSuccess {String} tipoTransporte Tipo transporte realizado por el operador.
   * @apiSuccess {String} tipoVehiculo Tipo de vehículo.
   * @apiSuccess {String} fechaInicio Fecha de inicio de vigencia de la tarjeta de operación.
   * @apiSuccess {String} fechaFin Fecha fin de vigencia de la tarjeta de operación.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/vehiculos/5675NBG/tarjetas/5398' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * {
   *     "estado": "OK",
   *     "tipoTarjeta": "5E",
   *     "nit": "283596024",
   *     "numeroRegistro": "1874",
   *     "color": "VERDE",
   *     "marca": "MARCA09",
   *     "modelo": "2013",
   *     "chasis": "8975FGRHV",
   *     "capacidadCarga": "12,00",
   *     "tipoTransporte": "Carga",
   *     "tipoVehiculo": "Camion",
   *     "fechaInicio": "02/06/2017",
   *     "fechaFin": "02/06/2021"
   * }
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas/:numeroTarjeta`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas/:numeroTarjeta] Iniciando...`, req.route);
      const parametrosValidados = vehiculosBL.validarParametrosVehiculo(req.params);
      vehiculosBL.consultarVehiculosVigentes(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas/:numeroTarjeta] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas/:numeroTarjeta] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/vehiculos/:placa/tarjetas Última tarjeta
   * @apiDescription Proporciona los datos de la última tarjeta de operación de un operador de transporte
   * @apiName consultarUltimaTarjeta
   * @apiGroup vehiculos
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {String} placa Número de la placa asignado por el RUAT.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {String} estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} tipoTarjeta Categoría de la tarjeta.
   * @apiSuccess {String} nit Número de identificación tributaria.
   * @apiSuccess {String} numeroRegistro Número de BOTIC del operador de transporte asignado por el VMT.
   * @apiSuccess {String} color Color del vehículo.
   * @apiSuccess {String} marca Marca del vehículo.
   * @apiSuccess {String} modelo Año de fabricación del vehículo.
   * @apiSuccess {String} chasis Número de chasis del vehículo.
   * @apiSuccess {String} capacidadCarga Capacidad de carga expresada en toneladas.
   * @apiSuccess {String} tipoTransporte Tipo transporte realizado por el operador.
   * @apiSuccess {String} tipoVehiculo Tipo de vehículo.
   * @apiSuccess {String} fechaInicio Fecha de inicio de vigencia de la tarjeta de operación.
   * @apiSuccess {String} fechaFin Fecha fin de vigencia de la tarjeta de operación.
   * @apiSuccess {String} estadoVehiculo Estado del vehículo.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/vehiculos/5675NBG/tarjetas' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * {
   *     "estado": "OK",
   *     "tipoTarjeta": "5E",
   *     "nit": "283596024",
   *     "numeroRegistro": "1874",
   *     "color": "VERDE",
   *     "marca": "MARCA09",
   *     "modelo": "2013",
   *     "chasis": "8975FGRHV",
   *     "capacidadCarga": "12,00",
   *     "tipoTransporte": "Carga",
   *     "tipoVehiculo": "Camion",
   *     "fechaInicio": "02/06/2017",
   *     "fechaFin": "02/06/2021",
   *     "estadoVehiculo": "True"
   * }
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas] Iniciando...`, req.route);
      const parametrosValidados = vehiculosBL.validarParametrosUltimoVehiculo(req.params);
      vehiculosBL.consultarUltimaTarjeta(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:placa/tarjetas] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/vehiculos/:codigoVehiculo/permisos Permisos
   * @apiDescription Proporciona los datos de vehículos de permisos complementarios de un operador de transporte
   * @apiName consultarPermisosComplementarios
   * @apiGroup vehiculos
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {Integer} codigoVehiculo Código del vehículo del operador de transporte.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {String} estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} numeroRegistro Número de BOTIC del operador de transporte asignado por el VMT.
   * @apiSuccess {String} tipoVehiculo Tipo de vehículo.
   * @apiSuccess {String} placa Número de la placa asignado por el RUAT.
   * @apiSuccess {String} marca Marca del vehículo.
   * @apiSuccess {String} chasis Número de chasis del vehículo.
   * @apiSuccess {String} modelo Año de fabricación del vehículo.
   * @apiSuccess {String} capacidadCarga Capacidad de carga expresada en toneladas.
   * @apiSuccess {String} tipoCarroceria Tipo de carrocería del vehículo.
   * @apiSuccess {String} numeroEjes Número de ejes del vehículo.
   * @apiSuccess {String} tipoAutorizacion Alta del vehículo.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/vehiculos/8544/permisos' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "tipoVehiculo": "CAMION",
   *         "placa": "EDR345",
   *         "marca": "VOLVO",
   *         "chasis": "YV2A4B3C54A259584",
   *         "modelo": "2004",
   *         "capacidadCarga": "0,00",
   *         "tipoCarroceria": "",
   *         "numeroEjes": "3",
   *         "tipoAutorizacion": "Alta"
   *     },
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "tipoVehiculo": "CAMION",
   *         "placa": "NBG567",
   *         "marca": "VOLVO",
   *         "chasis": "GROENEWENG",
   *         "modelo": "2000",
   *         "capacidadCarga": "20,00",
   *         "tipoCarroceria": "CAJA ABIERTA",
   *         "numeroEjes": "3",
   *         "tipoAutorizacion": "Alta"
   *     }
   * ]
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:codigoVehiculo/permisos`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:codigoVehiculo/permisos] Iniciando...`, req.route);
      const parametrosValidados = vehiculosBL.validarParametrosPermisosVehiculo(req.params);
      vehiculosBL.consultarPermisosComplementarios(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:codigoVehiculo/permisos] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/vehiculos/:codigoVehiculo/permisos] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });
};
