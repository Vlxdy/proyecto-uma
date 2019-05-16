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
    tramite.fechaHojaRuta = valores.dtTmp.fechaHojaRuta;
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
    tramite.fechaHojaRuta = elemento.dtTmp.fechaHojaRuta;
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

module.exports.obtenerRespuestaVehiculosVigentes = (result) => {
  const vehiculos = [];
  const valores = result.VehiculoVigentesResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    const vehiculo = {};
    vehiculo.estado = valores.dtTmp.estado;
    vehiculo.tipoTarjeta = valores.dtTmp.tipoTarjeta;
    vehiculo.nit = valores.dtTmp.nit;
    vehiculo.numeroRegistro = valores.dtTmp.numeroRegistro;
    vehiculo.color = valores.dtTmp.color;
    vehiculo.marca = valores.dtTmp.marca;
    vehiculo.modelo = valores.dtTmp.modelo;
    vehiculo.chasis = valores.dtTmp.chasis;
    vehiculo.capacidadCarga = valores.dtTmp.capacidaCarga;
    vehiculo.tipoTransporte = valores.dtTmp.tipoTransporte;
    vehiculo.tipoVehiculo = valores.dtTmp.tipoVehiculo;
    vehiculo.fechaInicio = valores.dtTmp.fechaInicio;
    vehiculo.fechaFin = valores.dtTmp.fechaFin;
    return vehiculo;
  }
  elementos.forEach((elemento) => {
    const vehiculo = {};
    vehiculo.estado = elemento.dtTmp.estado;
    vehiculo.tipoTarjeta = elemento.dtTmp.tipoTarjeta;
    vehiculo.nit = elemento.dtTmp.nit;
    vehiculo.numeroRegistro = elemento.dtTmp.numeroRegistro;
    vehiculo.color = elemento.dtTmp.color;
    vehiculo.marca = elemento.dtTmp.marca;
    vehiculo.modelo = elemento.dtTmp.modelo;
    vehiculo.chasis = elemento.dtTmp.chasis;
    vehiculo.capacidadCarga = elemento.dtTmp.capacidaCarga;
    vehiculo.tipoTransporte = elemento.dtTmp.tipoTransporte;
    vehiculo.tipoVehiculo = elemento.dtTmp.tipoVehiculo;
    vehiculo.fechaInicio = elemento.dtTmp.fechaInicio;
    vehiculo.fechaFin = elemento.dtTmp.fechaFin;
    vehiculos.push(vehiculo);
  });
  return vehiculos;
};

module.exports.obtenerRespuestaVehiculoUltimaTarjeta = (result) => {
  const vehiculos = [];
  const valores = result.VehiculoUltimaTarjetaResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    const vehiculo = {};
    vehiculo.estado = valores.dtTmp.estado;
    vehiculo.tipoTarjeta = valores.dtTmp.tipoTarjeta;
    vehiculo.nit = valores.dtTmp.nit;
    vehiculo.numeroRegistro = valores.dtTmp.numeroRegistro;
    vehiculo.color = valores.dtTmp.color;
    vehiculo.marca = valores.dtTmp.marca;
    vehiculo.modelo = valores.dtTmp.modelo;
    vehiculo.chasis = valores.dtTmp.chasis;
    vehiculo.capacidadCarga = valores.dtTmp.capacidaCarga;
    vehiculo.tipoTransporte = valores.dtTmp.tipoTransporte;
    vehiculo.tipoVehiculo = valores.dtTmp.tipoVehiculo;
    vehiculo.fechaInicio = valores.dtTmp.fechaInicio;
    vehiculo.fechaFin = valores.dtTmp.fechaFin;
    vehiculo.estadoVehiculo = valores.dtTmp.estadoVehiculo;
    return vehiculo;
  }
  elementos.forEach((elemento) => {
    const vehiculo = {};
    vehiculo.estado = elemento.dtTmp.estado;
    vehiculo.tipoTarjeta = elemento.dtTmp.tipoTarjeta;
    vehiculo.nit = elemento.dtTmp.nit;
    vehiculo.numeroRegistro = elemento.dtTmp.numeroRegistro;
    vehiculo.color = elemento.dtTmp.color;
    vehiculo.marca = elemento.dtTmp.marca;
    vehiculo.modelo = elemento.dtTmp.modelo;
    vehiculo.chasis = elemento.dtTmp.chasis;
    vehiculo.capacidadCarga = elemento.dtTmp.capacidaCarga;
    vehiculo.tipoTransporte = elemento.dtTmp.tipoTransporte;
    vehiculo.tipoVehiculo = elemento.dtTmp.tipoVehiculo;
    vehiculo.fechaInicio = elemento.dtTmp.fechaInicio;
    vehiculo.fechaFin = elemento.dtTmp.fechaFin;
    vehiculo.estadoVehiculo = elemento.dtTmp.estadoVehiculo;
    vehiculos.push(vehiculo);
  });
  return vehiculos;
};

module.exports.obtenerRespuestaComplementariosVehiculos = (result) => {
  const permisos = [];
  const valores = result.ComplementariosVehiculosResult.diffgram.DocumentElement;
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
    permiso.tipoVehiculo = elemento.tipoVehiculo;
    permiso.placa = elemento.placa;
    permiso.marca = elemento.marca;
    permiso.chasis = elemento.chasis;
    permiso.modelo = elemento.modelo;
    permiso.capacidadCarga = elemento.capacidaCarga;
    permiso.tipoCarroceria = elemento.tipoCarroceria;
    permiso.numeroEjes = elemento.numeroEjes;
    permiso.tipoAutorizacion = elemento.tipoAutorizacion;
    permisos.push(permiso);
  });
  return permisos;
};

module.exports.obtenerRespuestaOperadoresRegistro = (result) => {
  const operadores = [];
  const valores = result.OperadoresRegistroAgeticResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    elementos.push(valores.dtTmp);
  }
  elementos.forEach((elemento) => {
    const operador = {};
    operador.estado = elemento.estado;
    operador.sigla = elemento.sigla;
    operador.numeroRegistro = elemento.numeroRegistro;
    operador.nit = elemento.nit;
    operador.razonSocial = elemento.razonSocial;
    operadores.push(operador);
  });
  return operadores;
};

module.exports.obtenerRespuestaOperadores = (result) => {
  const operadores = [];
  const valores = result.OperadoresAgeticResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    elementos.push(valores.dtTmp);
  }
  elementos.forEach((elemento) => {
    const operador = {};
    operador.estado = elemento.estado;
    operador.nit = elemento.nit;
    operador.numeroRegistro = elemento.numeroRegistro;
    operador.razonSocial = elemento.razonSocial;
    operador.nombreComercial = elemento.nombreComercial;
    operador.sigla = elemento.sigla;
    operador.tipoDocumento = elemento.ztipoDocumento;
    operador.maRa = elemento.maRa;
    operador.estaOperador = elemento.estaOperador;
    operador.tipoTransporte = elemento.tipoTransporte;
    operador.tipoRepresentante = elemento.tipoRepresentante;
    operador.ciRepresentante = elemento.ciRepresentante;
    operadores.push(operador);
  });
  return operadores;
};

module.exports.obtenerRespuestaVehiculos = (result) => {
  const vehiculos = [];
  const valores = result.VehiculosAgeticResult.diffgram.DocumentElement;
  let elementos = [];
  if (valores.dtTmp instanceof Array) {
    elementos = valores.dtTmp;
  } else {
    elementos.push(valores.dtTmp);
  }
  elementos.forEach((elemento) => {
    const vehiculo = {};
    vehiculo.estado = elemento.estado;
    vehiculo.placa = elemento.placa;
    vehiculo.numeroRegistro = elemento.numeroRegistro;
    vehiculo.tipoVehiculo = elemento.tipoVehiculo;
    vehiculo.marca = elemento.marca;
    vehiculo.chasis = elemento.chasis;
    vehiculo.modelo = elemento.modelo;
    vehiculo.capacidadCarga = elemento.capacidaCarga;
    vehiculo.tipoTransporte = elemento.tipoTransporte;
    vehiculo.numeroEjes = elemento.numeroEjes;
    vehiculo.numeroTarjeta = elemento.numeroTarjeta;
    vehiculo.tipoTarjeta = elemento.tipoTarjeta;
    vehiculo.fechaDesde = elemento.fechaDesde;
    vehiculo.fechaHasta = elemento.fechaHasta;
    vehiculos.push(vehiculo);
  });
  return vehiculos;
};

module.exports.obtenerRespuestaCertificado = (result) => {
  const valores = result.CertificadoCabocoAgeticResult.diffgram.DocumentElement;
  return { estado: valores.dtTmp.estado };
};
