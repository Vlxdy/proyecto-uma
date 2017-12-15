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
   * @apiParam {String} nit Número de identificación tributaria del operador de transporte.
   * @apiParam {String} numeroRegistro Número del BOTIC del operador de tranporte asignado por el VMT.
   *
   * @apiHeader {String} Authorization Token de acceso al servicio.
   *
   * @apiSuccess {Object} . Objeto que contiene la respuesta del servicio.
   * @apiSuccess {Object[]} .representantes Array que contiene el listado de representantes legales.
   * @apiSuccess {String} .representantes.estado OK si existe el operador o ERR si no existe.
   * @apiSuccess {String} .representantes.tipo Tipo de identificación del representante.
   * @apiSuccess {String} .representantes.numero Número de cédula de identidad del representante.
   * @apiSuccess {String} .representantes.estadoOperador H si el operador está habilitado o S si está suspendido.
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
      logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Iniciando...`, req.route);
      const parametrosValidados = operadoresBL.validarParametrosOperador(req.params, req.query);
      operadoresBL.obtenerRepresentantesLegales(parametrosValidados, (err, respuesta) => {
        if (err) {
          logger.error(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Error...`, err);
          return res.status(err.statusCode || 500).json(err);
        }
        logger.info(`[${config.app.baseUrl}/v${props.datosServicio.version}/operadores] Respuesta`, respuesta);
        return res.json(respuesta);
      });
    });
};
