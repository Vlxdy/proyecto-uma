const packageJson = require('../package.json');
const fs = require('fs');

const esquema = {
  nombre: packageJson.name,
  publicador: packageJson.datosServicio.entidad,
  version: parseInt(packageJson.datosServicio.version, 10),
  metodos: [{
    identificador: '',
    nombre: '',
    descripcion: '',
    idCatalogo: 0,
    verbo: '',
    url: '',
    datosRespuesta: {}
  }],
};

fs.writeFile(`tooling/${packageJson.datosServicio.entidad.toLowerCase()}v${parseInt(packageJson.datosServicio.version, 10)}.json`, JSON.stringify(esquema, null, 2), (err) => {
  if(err) {
    console.log('Problema al crear el archivo', err);
    process.exit(1);
    return;
  }
  console.log('Esquema creado con éxito', err);
  process.exit(0);
});
