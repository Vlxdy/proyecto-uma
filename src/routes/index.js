const estado = require("./estado");
const vehiculosRT = require("./vehiculosRT");
const operadoresRT = require("./operadoresRT");
const propiedades = require("../../package.json");

const armarRutas = (app) => {
  console.log("estado:", estado);
  console.log("vehiculosRT:", vehiculosRT);
  // console.log("operadoresRT:", operadoresRT);
  

  const config = app.get("config");
  const base = `${config.app.baseUrl}/v${propiedades.datosServicio.version}`;
  app.use(base, estado);
  app.use(base, vehiculosRT);
  // app.use(base, operadoresRT);
};

module.exports = armarRutas;
