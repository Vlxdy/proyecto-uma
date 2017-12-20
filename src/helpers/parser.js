module.exports.obtenerRespuesta = (result) => {
  const representantes = [];
  const valores = result.OperadorRepresentanteBoticResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    elementos.push(valores.dtTmp);
  }
  elementos.forEach((elemento) => {
    const representante = {};
    representante.estado = elemento.estado;
    representante.tipo = elemento.tipo;
    representante.numero = elemento.numero;
    representante.estadoOperador = elemento.estadoOperador;
    representantes.push(representante);
  });
  return representantes;
};

module.exports.obtenerRespuestaCapacidadCarga = (result) => {
  const respuestas = [];
  const valores = result.OperadorCapacidadCargaResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    const respuesta = {};
    respuesta.estado = valores.dtTmp.estado;
    respuesta.capacidadSocios = valores.dtTmp.capacidadSocios;
    return respuesta;
  }
  elementos.forEach((elemento) => {
    const respuesta = {};
    respuesta.estado = elemento.estado;
    respuesta.capacidadSocios = elemento.capacidadSocios;
    respuestas.push(respuesta);
  });
  return respuestas;
};

module.exports.obtenerRespuestaPermisosComplementarios = (result) => {
  const permisos = [];
  const valores = result.OperadorPermisosComplementariosResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    elementos.push(valores.dtTmp);
  }
  elementos.forEach((elemento) => {
    const permiso = {};
    permiso.estado = elemento.estado;
    permiso.numeroRegistro = elemento.numeroRegistro;
    permiso.razonSocial = elemento.razonSocial;
    permiso.representanteLegalCI = elemento.representanteLegaCI;
    permisos.push(permiso);
  });
  return permisos;
};

module.exports.obtenerRespuestaTramitePermisos = (result) => {
  const tramites = [];
  const valores = result.VerificacionLlenadoTREResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    const tramite = {};
    tramite.estado = valores.dtTmp.estado;
    tramite.pais = valores.dtTmp.pais;
    tramite.documentoIdoneidad = valores.dtTmp.documentoIdoneidad;
    tramite.hojaRuta = valores.dtTmp.hojaRuta;
    tramite.fechaHoraRuta = valores.dtTmp.fechaHoraRuta;
    tramite.tipoDocSoporte = valores.dtTmp.tipoDocSoporte;
    tramite.numeroDocSoporte = valores.dtTmp.numeroDocSoporte;
    tramite.fechaEmisionDocSoporte = valores.dtTmp.fechaEmisionDocSoporte;
    tramite.fechaExpiracionDocSoporte = valores.dtTmp.fechaExpiracionDocSoporte;
    tramite.codigoIDVehiculos = valores.dtTmp.codigoIDVehiculos;
    tramite.razonSocial = valores.dtTmp.razonSocial;
    return tramite;
  }
  elementos.forEach((elemento) => {
    const tramite = {};
    tramite.estado = elemento.dtTmp.estado;
    tramite.pais = elemento.dtTmp.pais;
    tramite.documentoIdoneidad = elemento.dtTmp.documentoIdoneidad;
    tramite.hojaRuta = elemento.dtTmp.hojaRuta;
    tramite.fechaHoraRuta = elemento.dtTmp.fechaHoraRuta;
    tramite.tipoDocSoporte = elemento.dtTmp.tipoDocSoporte;
    tramite.numeroDocSoporte = elemento.dtTmp.numeroDocSoporte;
    tramite.fechaEmisionDocSoporte = elemento.dtTmp.fechaEmisionDocSoporte;
    tramite.fechaExpiracionDocSoporte = elemento.dtTmp.fechaExpiracionDocSoporte;
    tramite.codigoIDVehiculos = elemento.dtTmp.codigoIDVehiculos;
    tramite.razonSocial = elemento.dtTmp.razonSocial;
    tramites.push(tramite);
  });
  return tramites;
};
