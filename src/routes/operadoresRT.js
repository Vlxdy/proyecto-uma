const logger = require('../helpers/logger');
const props = require('../../package.json');

/**
* @apiDefine uso Api de la USO
*/

module.exports = (app) => {
  const { config } = app.configurations;
  const { operadoresBL } = app.bls;

  /**
   * @api {get} <base-url>/v<version-servicio>/operadores/:nit/representantes?numeroRegistro=:numeroRegistro Representantes
   * @apiDescription Proporciona un listado de los representantes legales de un operador de transporte
   * @apiName obtenerRepresentantes
   * @apiGroup uso
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {Integer} nit Número de identificación tributaria del operador de transporte.
   * @apiParam {Integer} numeroRegistro Número del BOTIC del operador de tranporte asignado por el VMT.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {Object[]} . Array que contiene la respuesta del servicio.
   * @apiSuccess {String} .estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} .tipo Tipo de identificación del representante.
   * @apiSuccess {String} .numero Número de cédula de identidad del representante.
   * @apiSuccess {String} .estadoOperador H si el operador está habilitado o S si está suspendido.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/operadores/123456/representantes?numeroRegistro=123' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *     {
   *         "estado": "OK",
   *         "tipo": "CI",
   *         "numero": "2763627",
   *         "estadoOperador": "S"
   *     },
   *     {
   *         "estado": "OK",
   *         "tipo": "CI",
   *         "numero": "2773943",
   *         "estadoOperador": "S"
   *     }
   * ]
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/representantes`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/representantes] Iniciando...`, req.route);
      const parametrosValidados = operadoresBL.validarParametrosOperador(req.params, req.query);
      operadoresBL.obtenerRepresentantesLegales(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/representantes] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/representantes] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/operadores/:nit/capacidades?numeroRegistro=:numeroRegistro Capacidades
   * @apiDescription Proporciona el estado de un operador de transporte
   * @apiName obtenerCapacidades
   * @apiGroup uso
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {Integer} nit Número de identificación tributaria del operador de transporte.
   * @apiParam {Integer} numeroRegistro Número del BOTIC del operador de tranporte asignado por el VMT.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {String} estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} capacidadSocios H si el operador está habilitado o S si está suspendido.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/operadores/123456/capacidades?numeroRegistro=123' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * {
   *     "estado": "OK",
   *     "capacidadSocios": "H"
   * }
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/capacidades`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/capacidades] Iniciando...`, req.route);
      const parametrosValidados = operadoresBL.validarParametrosOperador(req.params, req.query);
      operadoresBL.obtenerCapacidadCarga(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/capacidades] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:nit/capacidades] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/operadores/:documentoIdoneidad/permisos?pais=:pais Permisos
   * @apiDescription Proporciona un listado de los permisos complementarios de un operador de transporte
   * @apiName obtenerPermisos
   * @apiGroup uso
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {String} documentoIdoneidad Número de documento de idoneidad del operador de transporte.
   * @apiParam {Integer} pais Código de país de origen del operador de transporte.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {Object[]} . Array que contiene la respuesta del servicio.
   * @apiSuccess {String} .estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} .numeroRegistro Número de BOTIC del operador de transporte asignado por el VMT, 0 en caso de error.
   * @apiSuccess {String} .razonSocial Razón social del operador de transporte.
   * @apiSuccess {String} .representanteLegalCI Número de cédula de identidad del representante legal.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/operadores/123456/permisos?pais=2' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "razonSocial": "TRANSPORTES FUTURO S.A.",
   *         "representanteLegalCI": "4779123"
   *     }
   * ]
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:documentoIdoneidad/permisos`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:documentoIdoneidad/permisos] Iniciando...`, req.route);
      const parametrosValidados = operadoresBL.validarParametrosOperadorPermisos(req.params, req.query);
      operadoresBL.obtenerPermisosComplementarios(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:documentoIdoneidad/permisos] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:documentoIdoneidad/permisos] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/operadores/:codigoIdentificacion/tramites Trámites
   * @apiDescription Proporciona datos del trámite de permiso complementario de un operador de transporte
   * @apiName obtenerTramites
   * @apiGroup uso
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {String} codigoIdenticacion Número asignado por el VMT al trámite de permiso complementario del operador de transporte.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {String} estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} pais País origen del operador de transporte.
   * @apiSuccess {String} documentoIdoneidad Número de documento de idoneidad asignada en país de origen del operador de transporte.
   * @apiSuccess {String} hojaRuta Número de hoja de ruta asignada al trámite de permiso complementario.
   * @apiSuccess {String} fechaHojaRuta Fecha de creación del número de hoja de ruta.
   * @apiSuccess {String} tipoDocSoporte Tipo de trámite [Idoneidad - Certificado Provisorio, Idoneidad - Resolución Administrativa].
   * @apiSuccess {String} numeroDocSoporte Número de documento de idoneidad asignada en país de origen.
   * @apiSuccess {String} fechaEmisionDocSoporte Fecha de emisión del documento de idoneidad asignada en país de origen.
   * @apiSuccess {String} fechaExpiracionDocSoporte Fecha de vigencia del documento de idoneidad asignada en país de origen.
   * @apiSuccess {String} codigoIDVehiculos Código asignado por el VMT para identificar el parque automotor del operador.
   * @apiSuccess {String} razonSocial Razón social del operador de transporte.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'http://127.0.0.1:8081/v1/operadores/123456/capacidades?numeroRegistro=123' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * {
   *     "estado": "OK",
   *     "pais": "Argentina",
   *     "documentoIdoneidad": "7958",
   *     "hojaRuta": "34563/2017",
   *     "tipoDocSoporte": "Idoneidad - Certificado Provisorio",
   *     "numeroDocSoporte": "1637/2017",
   *     "fechaEmisionDocSoporte": "14/11/2017",
   *     "fechaExpiracionDocSoporte": "14/02/2018",
   *     "codigoIDVehiculos": "6849",
   *     "razonSocial": "JARAMILLO EMANUEL SERGIO"
   * }
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:codigoIdentificacion/tramites`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:codigoIdentificacion/tramites] Iniciando...`, req.route);
      const parametrosValidados = operadoresBL.validarParametrosOperadorTramites(req.params);
      operadoresBL.obtenerTramitePermisosComplementarios(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:codigoIdentificacion/tramites] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:codigoIdentificacion/tramites] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });
};
