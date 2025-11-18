const fs = require("fs-extra");
const propiedades = require("../package.json");
const app = require("../src/configs/app");

const info = {
  descripcion: propiedades.description,
  nombre: `${propiedades.datosServicio.entidad} v${propiedades.datosServicio.version}`,
  url: `${app.baseUrl}/v${propiedades.datosServicio.version}`,
};

fs.writeJsonSync("public/info.json", info, { spaces: 2 });
console.log("Archivo info.json creado ✅");