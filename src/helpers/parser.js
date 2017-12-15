const xml2jsonParser = require('xml2json');

function convertirXmlAJson(xml) {
  return JSON.parse(xml2jsonParser.toJson(xml, {
    arrayNotation: [''],
  }));
}

module.exports.obtenerRespuesta = (datos) => {
  const datosEnJson = convertirXmlAJson(datos);
  return JSON.parse(datosEnJson.string.$t);
};
