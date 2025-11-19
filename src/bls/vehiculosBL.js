const CodeError = require("../errors/code_error");
const vehiculosWS = require("../services/vehiculosWS");
const logger = require("../helpers/logger");
const parser = require("../helpers/parser");

const servicesConfig = require("../configs/services");

// ------------------------
// FUNCION XML BUILDER
// ------------------------

function ParametrosWS() {
  const self = {};

  // IMPORTANTE: el endpoint real NO es el WSDL
  self.url = servicesConfig.wsdlUso.replace("?WSDL", "");

  self.metodo = "";
  self.body = {};

  self.header = {
    UsuarioNombre: servicesConfig.usuario,
    UsuarioClave: servicesConfig.clave,
  };

  const buildBody = () =>
    Object.entries(self.body)
      .map(([k, v]) => `<${k}>${v}</${k}>`)
      .join("");

  // XML CORREGIDO PARA QUE COINCIDA CON EL WSDL
  self.xml = () => `
    <soapenv:Envelope 
        xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:pub="http://srv.oopp.gob.bo/Public/">

      <soapenv:Header>
        <pub:Autenticacion>
          <pub:UsuarioNombre>${self.header.UsuarioNombre}</pub:UsuarioNombre>
          <pub:UsuarioClave>${self.header.UsuarioClave}</pub:UsuarioClave>
        </pub:Autenticacion>
      </soapenv:Header>

      <soapenv:Body>
        <pub:${self.metodo}>
          ${buildBody()}
        </pub:${self.metodo}>
      </soapenv:Body>

    </soapenv:Envelope>
  `;

  return self;
}

const validarParametrosVehiculo = (params) => {
  const parametrosWS = new ParametrosWS();
  parametrosWS.metodo = "VehiculosVigentes";
  if (!params.placa) {
    throw new CodeError('El parámetro "placa" es necesario');
  }
  if (!/^[\dA-Z]+$/.test(params.placa)) {
    throw new CodeError(
      'El parámetro "placa" solamente puede contener números seguidos de letras mayúsculas'
    );
  }
  parametrosWS.body.vPlaca = params.placa;

  if (!params.numeroTarjeta) {
    throw new CodeError('El parámetro "numeroTarjeta" es necesario');
  }

  if (!/^[0-9]*$/.test(params.numeroTarjeta)) {
    throw new CodeError(
      'El parámetro "numeroTarjeta" solamente puede contener números'
    );
  }

  parametrosWS.body.vNumeroTarjeta = params.numeroTarjeta;

  return parametrosWS;
};

const validarParametrosUltimoVehiculo = (params) => {
  const parametrosWS = new ParametrosWS();
  parametrosWS.metodo = "VehiculoUltimaTarjeta";
  if (!params.placa) {
    throw new CodeError('El parámetro "placa" es necesario');
  }
  if (!/^[\dA-Z]+$/.test(params.placa)) {
    throw new CodeError(
      'El parámetro "placa" solamente puede contener números seguidos de letras mayúsculas'
    );
  }
  parametrosWS.body.vPlaca = params.placa;
  return parametrosWS;
};

const validarParametrosPermisosVehiculo = (params) => {
  const parametrosWS = new ParametrosWS();
  parametrosWS.metodo = "ComplementariosVehiculos";
  if (!params.codigoVehiculo) {
    throw new CodeError('El parámetro "codigoVehiculo" es necesario');
  }
  if (!/^[0-9]+$/.test(params.codigoVehiculo)) {
    throw new CodeError(
      'El parámetro "codigoVehiculo" solamente puede contener números'
    );
  }
  parametrosWS.body.vCodigoIDVehiculos = params.codigoVehiculo;
  return parametrosWS;
};

// ------------------------
// CONSUMOS WS - PROMESAS
// ------------------------

const consultarVehiculosVigentes = (pWS) => {
  logger.info(`[consultarVehiculosVigentes] Iniciando...`);

  const xml = pWS.xml();
  let statusCode = 200;

  return Promise.resolve()
    .then(() => vehiculosWS.vehiculoVigentes(pWS.url, xml))
    .then((wsResponse) => {
      const data = parser.obtenerRespuestaVehiculosVigentes(wsResponse);
      return { statusCode, data };
    });
};

const consultarUltimaTarjeta = (parametrosWS) => {
  logger.info(`[consultarUltimaTarjeta] Parametros enviados`);

  // Prepara XML
  const xml = parametrosWS.xml();
  let statusCode = 200;

  return Promise.resolve()
    .then(() => vehiculosWS.vehiculoUltimaTarjeta(parametrosWS.url, xml))
    .then((wsResponse) => {
      const data = parser.obtenerRespuestaVehiculoUltimaTarjeta(wsResponse);
      return { statusCode, data };
    });
};

const consultarPermisosComplementarios = (parametrosWS) => {
  logger.info(`[consultarPermisosComplementarios] Parametros enviados`);

  const xml = parametrosWS.xml();
  let statusCode = 200;

  return Promise.resolve()
    .then(() => vehiculosWS.complementariosVehiculos(parametrosWS.url, xml))
    .then((wsResponse) => {
      const data = parser.obtenerRespuestaComplementariosVehiculos(wsResponse);
      return { statusCode, data };
    });
};

const obtenerVehiculos = () => {
  logger.info(`[obtenerVehiculos] Parametros enviados`);

  const parametrosWS = new ParametrosWS(servicesConfig.wsdlUso);
  parametrosWS.metodo = "VehiculosAgetic";

  const xml = parametrosWS.xml();
  let statusCode = 200;

  return Promise.resolve()
    .then(() => vehiculosWS.vehiculosAgetic(parametrosWS.url, xml, parametrosWS.metodo))
    .then((wsResponse) => {
      const data = parser.obtenerRespuestaVehiculos(wsResponse);
      return { statusCode, data };
    });
};

module.exports = {
  validarParametrosVehiculo,
  validarParametrosUltimoVehiculo,
  validarParametrosPermisosVehiculo,
  consultarVehiculosVigentes,
  consultarUltimaTarjeta,
  consultarPermisosComplementarios,
  obtenerVehiculos,
};
