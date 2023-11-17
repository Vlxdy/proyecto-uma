const express = require('express');
const propiedades = require('../../package.json');

const router = express.Router();

module.exports = (app) => {
  /**
  * @api {get} <base-url>/v<version-servicio>/estado Estado de la API REST
  * @apiGroup Estado
  * @apiHeader {String} Authorization Token de acceso proporcionado por la Plataforma de Interoperabilidad.
  * @apiSuccess {String} estado Muestra un mensaje del estado de la aplicación
  * @apiSuccessExample {json} Success
  *
  * HTTP/1.1 200 OK
  *
  * {
  *  "estado": "El servicio de <nombre-entidad-servicio> v<version-servicio> se encuentra disponible"
  * }
  *
  * @apiVersion 1.0.0
  */
  router.route(`/v${propiedades.datosServicio.version}/estado`)
    .get((req, res) => {
      res.json({ estado: `El servicio de ${propiedades.datosServicio.entidad} v${propiedades.datosServicio.version} se encuentra disponible` });
    });

  /**
  * @api {get} <base-url>/v<version-servicio>/despliegue Versión desplegada de la API REST
  * @apiGroup Estado
  * @apiHeader {String} Authorization Token de acceso proporcionado por la Plataforma de Interoperabilidad.
  * @apiSuccess {String} version Muestra la versión de la aplicación desplegada
  * @apiSuccessExample {json} Success
  *
  * HTTP/1.1 200 OK
  *
  * {
  *  "version": "<version-deploy>"
  * }
  *
  * @apiVersion 1.0.0
  */
  router.route(`/v${propiedades.datosServicio.version}/despliegue`)
    .get((req, res) => {
      res.json({ version: `${propiedades.version}` });
    });

  app.use(`${app.configurations.config.app.baseUrl}`, router);
};
