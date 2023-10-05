const logger = require('../helpers/logger');
const props = require('../../package.json');

/**
* @apiDefine operadores Api de la USO Operadores
*/

module.exports = (app) => {
  const { config } = app.configurations;
  const { operadoresBL } = app.bls;

  /**
   * @api {get} <base-url>/v<version-servicio>/operadores/:nit/representantes?numeroRegistro=:numeroRegistro Representantes
   * @apiDescription Proporciona un listado de los representantes legales de un operador de transporte
   * @apiName obtenerRepresentantes
   * @apiGroup operadores
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
   *      'https://interoperabilidad.agetic.gob.bo/fake/uso/v1/operadores/3457869016/representantes?numeroRegistro=1696' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *     {
   *         "estado": "OK",
   *         "tipo": "CI",
   *         "numero": "3457869",
   *         "estadoOperador": "H"
   *     },
   *     {
   *         "estado": "OK",
   *         "tipo": "CI",
   *         "numero": "3457869",
   *         "estadoOperador": "H"
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
   * @apiGroup operadores
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
   *      'https://interoperabilidad.agetic.gob.bo/fake/uso/v1/operadores/3457869016/capacidades?numeroRegistro=1696' \
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
   * @apiGroup operadores
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
   *      'https://interoperabilidad.agetic.gob.bo/fake/uso/v1/operadores/4312/permisos?pais=4' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "razonSocial": "NEYVA LUCUY BARJA",
   *         "representanteLegalCI": "7466721"
   *     },
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "razonSocial": "NEYVA LUCUY BARJA",
   *         "representanteLegalCI": "7466721"
   *     },
   *     {
   *         "estado": "OK",
   *         "numeroRegistro": "0",
   *         "razonSocial": "NEYVA LUCUY BARJA",
   *         "representanteLegalCI": "7466721"
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
   * @api {get} <base-url>/v<version-servicio>/operadores/tramites?codigoIdentificacion=:codigoIdentificacion Trámites
   * @apiDescription Proporciona datos del trámite de permiso complementario de un operador de transporte
   * @apiName obtenerTramites
   * @apiGroup operadores
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
   *      'https://interoperabilidad.agetic.gob.bo/fake/uso/v1/operadores/tramites?codigoIdentificacion=1474/2017' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * {
   *     "estado": "OK",
   *     "pais": "Chile",
   *     "documentoIdoneidad": "4217",
   *     "hojaRuta": "38954/2017",
   *     "fechaHojaRuta": "11/11/2017",
   *     "tipoDocSoporte": "Idoneidad - Resolución Administrativa",
   *     "numeroDocSoporte": "018954",
   *     "fechaEmisionDocSoporte": "21/12/2017",
   *     "fechaExpiracionDocSoporte": "27/09/2027",
   *     "codigoIDVehiculos": "8544",
   *     "razonSocial": "CECILIA MIRANDA FLORES"
   * }
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/operadores/tramites`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:codigoIdentificacion/tramites] Iniciando...`, req.route);
      const parametrosValidados = operadoresBL.validarParametrosOperadorTramites(req.query);
      operadoresBL.obtenerTramitePermisosComplementarios(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:codigoIdentificacion/tramites] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores/:codigoIdentificacion/tramites] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/operadores Operadores
   * @apiDescription Proporciona datos de los operadores de transporte
   * @apiName obtenerOperadores
   * @apiGroup operadores
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {Object[]} . Array que contiene la respuesta del servicio.
   * @apiSuccess {String} .estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} .nit Número de identificación tributaria del operador.
   * @apiSuccess {String} .numeroRegistro Número de registro del operador asignado por el VMT.
   * @apiSuccess {String} .razonSocial Razón social del operador.
   * @apiSuccess {String} .nombreComercial Nombre comercial utilizado por el operador.
   * @apiSuccess {String} .sigla Sigla del operador asignado por el VMT.
   * @apiSuccess {String} .tipoDocumento Documento que habilita al operador para constituirse en empresa o cooperativa.
   * @apiSuccess {String} .maRa Número del documento que habilita la empresa o cooperativa.
   * @apiSuccess {String} .estadoOperador H si el operador está habilitado o S si está suspendido.
   * @apiSuccess {String} .tipoTransporte El tipo de servicio de transporte.
   * @apiSuccess {String} .tipoRepresentante Especifica el tipo de representante legal del operador.
   * @apiSuccess {String} .ciRepresentante Número de identificación del representante legal.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'https://interoperabilidad.agetic.gob.bo/fake/uso/v1/operadores' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *     {
   *         "estado": "OK",
   *         "nit": null,
   *         "numeroRegistro": "2",
   *         "razonSocial": "COMERCIAL MENDEZ",
   *         "nombreComercial": null,
   *         "sigla": "BOTIC",
   *         "tipoDocumento": "Sin dato",
   *         "maRa": "Sin dato",
   *         "estaOperador": "S",
   *         "tipoTransporte": "Carga",
   *         "tipoRepresentante": "Sin dato",
   *         "ciRepresentante": null
   *     },
   *     {
   *         "estado": "OK",
   *         "nit": "363356029",
   *         "numeroRegistro": "1090",
   *         "razonSocial": "EMPRESA DE TRANSPORTE PREMIUMBUS S.R.L.",
   *         "nombreComercial": null,
   *         "sigla": "REG",
   *         "tipoDocumento": "Sin dato",
   *         "maRa": "Sin dato",
   *         "estaOperador": "S",
   *         "tipoTransporte": "Pasajeros",
   *         "tipoRepresentante": "Sin dato",
   *         "ciRepresentante": null
   *     }
   * ]
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */
  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/operadores`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Iniciando...`, req.route);
      operadoresBL.obtenerOperadores((err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/operadoresRegistro OperadoresRegistro
   * @apiDescription Proporciona datos de los operadores de transporte registrados
   * @apiName obtenerOperadoresRegistro
   * @apiGroup operadores
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {String} criterio Número de identificación tributaria del operador de transporte o Nombre registrado.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {Object[]} . Array que contiene la respuesta del servicio.
   * @apiSuccess {String} .estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} .sigla Sigla del operador asignado por el VMT.
   * @apiSuccess {String} .numeroRegistro Número de registro del operador asignado por el VMT.
   * @apiSuccess {String} .nit Número de identificación tributaria del operador.
   * @apiSuccess {String} .razonSocial Razón social del operador.
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'https://interoperabilidad.agetic.gob.bo/fake/uso/v1/operadoresRegistro?criterio=363356029' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   * [
   *   {
   *     "estado": "OK",
   *     "sigla": "REG",
   *     "numeroRegistro": "1090",
   *     "nit": "363356029",
   *     "razonSocial": "EMPRESA DE TRANSPORTE PREMIUMBUS S.R.L."
   *   }
   * ]
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */

  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/operadoresRegistro`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Iniciando...`, req.route);
      operadoresBL.obtenerOperadoresRegistro(req.query.criterio, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });

  /**
   * @api {get} <base-url>/v<version-servicio>/certificados?certificado=:numCertificado&caboco=:numCaboco&fecha=:fecha Certificado caboco
   * @apiDescription Proporciona estado de los certificados de los operadores de transporte registrados
   * @apiName obtenerEstadoCertificado
   * @apiGroup operadores
   * @apiPermission Acceso a solicitud
   * @apiVersion 1.0.0
   *
   * @apiParam {String} numCertificado  Número del certificado
   * @apiParam {String} numCaboco  Número asignado en CABOCO a la empresa constructora
   * @apiParam {String} fecha  Fecha en la que la CABOCO emitio el certificado
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {Object} . Objecto que contiene la respuesta del servicio.
   * @apiSuccess {String} .estado Describe el estado de la consulta. [Vigente, Caducado o Inexistente]
   *
   * @apiExample {curl} Ejemplo de consumo con curl con header de autorización
   * curl -X GET \
   *      'https://interoperabilidad.agetic.gob.bo/fake/uso/v1/certificados?certificado=1&caboco=1&fecha=01/01/2019' \
   *      -H 'Authorization: Bearer <token-de-acceso>'
   *
   * @apiSuccessExample {curl} Ejemplo de respuesta del servicio
   *   {
   *     "estado": "Vigente",
   *   }
   *
   * @apiSampleRequest https://interoperabilidad.agetic.gob.bo/fake
   */

  app.route(`${config.app.baseUrl}/v${props.datosServicio.version}/certificados`)
    .get((req, res) => {
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/certificados] Iniciando...`, req.route);
      const parametrosValidados = operadoresBL.validarParametrosCertificado(req.query);
      operadoresBL.obtenerCertificadoCaboco(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/certificados] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/certificados] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });
};
