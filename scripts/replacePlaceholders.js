const { replaceInFile } = require("replace-in-file"); 
const propiedades = require("../package.json");
const app = require("../src/configs/app");

(async () => {
  try {
    await replaceInFile({  
      files: "public/assets/main.bundle.js",
      from: [
        /{{version-servicio}}/g,
        /{{version-deploy}}/g,
        /{{base-url}}/g,
        /{{nombre-entidad-servicio}}/g,
        /{{domain}}/g,
      ],
      to: [
        propiedades.datosServicio.version,
        propiedades.version,
        app.baseUrl,
        propiedades.datosServicio.entidad,
        app.domain,
      ],
    });
    console.log("Reemplazos completados ✅");
  } catch (error) {
    console.error("Error en los reemplazos ❌", error);
  }
})();