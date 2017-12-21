const logger = require('../helpers/logger');
const props = require('../../package.json');

/**
* @apiDefine uso Api de la USO
*/

module.exports = (app) => {
  const { config } = app.configurations;
  const { vehiculosBL } = app.bls;

  /**
   * @api {get} <base-url>/v<version-servicio>/vehiculos/:placa/tarjetas/:numeroTarjeta Tarjetas
   * @apiDescription Proporciona los datos de los vehículos vigentes de un operador de transporte
   * @apiName consultarTarjetas
   * @apiGroup uso
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
   *      'http://127.0.0.1:8081/v1/vehiculos/123ABC/tarjetas/123' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * {
   *     "estado": "OK",
   *     "tipoTarjeta": "NE",
   *     "nit": "123482029",
   *     "numeroRegistro": "1667",
   *     "color": "ANARANJADO COMBINADO",
   *     "marca": "VOLVO",
   *     "modelo": "2010000",
   *     "chasis": "YV2DHNF7Y8U972",
   *     "tipoTransporte": "Carga",
   *     "tipoVehiculo": "Tracto Camion",
   *     "fechaInicio": "30/10/2017",
   *     "fechaFin": "30/10/2019"
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
   * @apiGroup uso
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
   *      'http://127.0.0.1:8081/v1/vehiculos/123ABC/tarjetas/123' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * {
   *     "estado": "OK",
   *     "tipoTarjeta": "NE",
   *     "nit": "123482029",
   *     "numeroRegistro": "1667",
   *     "color": "ANARANJADO COMBINADO",
   *     "marca": "VOLVO",
   *     "modelo": "2010000",
   *     "chasis": "YV2DHNF7Y8U972",
   *     "tipoTransporte": "Carga",
   *     "tipoVehiculo": "Tracto Camion",
   *     "fechaInicio": "30/10/2017",
   *     "fechaFin": "30/10/2019",
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
   * @apiGroup uso
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
   * @apiSuccess {String} modelo Año de fabricación del vehículo.
   * @apiSuccess {String} chasis Número de chasis del vehículo.
   * @apiSuccess {String} capacidadCarga Capacidad de carga expresada en toneladas.
   * @apiSuccess {String} tipoCarroceria Tipo de carrocería del vehículo.
   * @apiSuccess {String} numeroEjes Número de ejes del vehículo.
   * @apiSuccess {String} tipoAutorizacion Alta del vehículo.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/vehiculos/123/permisos' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "tipoVehiculo": "CAMION",
   *         "placa": "JPFF37",
   *         "marca": "VOLVO",
   *         "chasis": "YV2DF76G8HJB14",
   *         "modelo": "1997",
   *         "capacidadCarga": "14,00",
   *         "tipoCarroceria": "BARANDA",
   *         "numeroEjes": "3",
   *         "tipoAutorizacion": "Alta"
   *     },
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "tipoVehiculo": "REMOLQUE",
   *         "placa": "GRAS22",
   *         "marca": "FRUEHAUF",
   *         "chasis": "PW82346746",
   *         "modelo": "2000",
   *         "capacidadCarga": "13,00",
   *         "tipoCarroceria": "BARANDA",
   *         "numeroEjes": "2",
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
