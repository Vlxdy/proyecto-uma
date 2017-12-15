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
