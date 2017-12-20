/* eslint no-undef: 0 */
const configurations = app.configurations.config;
const propiedades = require('../../package.json');

describe('Ruta de consumo', () => {
  describe('Obtener datos de representantes legales de un operador de transporte', () => {
    it('Debe devolver el listado de representantes legales', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1010055029/representantes`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: 287 })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql([
            {
              estado: 'OK',
              tipo: 'CI',
              numero: '2763627',
              estadoOperador: 'S',
            },
            {
              estado: 'OK',
              tipo: 'CI',
              numero: '2773943',
              estadoOperador: 'S',
            },
          ]);
          return done();
        });
    });

    it('Debe devolver mensaje con error en caso de no encontrar representantes para el operador con el número de registro proporcionado', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1010055029/representantes`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: 285 })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql([
            {
              estado: 'ERR',
              tipo: null,
              numero: null,
              estadoOperador: null,
            },
          ]);
          return done();
        });
    });

    it('Debe devolver mensaje con error si no se envía el número de registro', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1010055029/representantes`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "numeroRegistro" es necesario');
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el NIT con letras', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/A010055029/representantes`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: 285 })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "nit" solamente puede contener números');
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el número de registro con letras', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1010055029/representantes`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: '285A' })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "numeroRegistro" solamente puede contener números');
          return done();
        });
    });
  });

  describe('Obtener datos de la capacidad de carga de un operador de transporte', () => {
    it('Debe devolver el estado del operador de transporte', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/332036022/capacidades`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: 2157 })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'OK',
            capacidadSocios: 'H',
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error en caso de no encontrar el estado del operador con el número de registro proporcionado', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/332036022/capacidades`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: 215 })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'ERR',
            capacidadSocios: '0',
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error si no se envía el número de registro', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1010055029/capacidades`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "numeroRegistro" es necesario');
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el NIT con letras', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/A010055029/capacidades`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: 285 })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "nit" solamente puede contener números');
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el número de registro con letras', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1010055029/capacidades`)
        .set('Accept', 'application/json')
        .query({ numeroRegistro: '285A' })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "numeroRegistro" solamente puede contener números');
          return done();
        });
    });
  });

  describe('Obtener datos de los permisos complementarios de un operador de transporte', () => {
    it('Debe devolver los permisos complementarios del operador de transporte', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/4486/permisos`)
        .set('Accept', 'application/json')
        .query({ pais: 2 })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql([
            {
              estado: 'OK',
              numeroRegistro: '0',
              razonSocial: 'ROMULO CACERES',
              representanteLegalCI: '608342',
            },
            {
              estado: 'OK',
              numeroRegistro: '0',
              razonSocial: 'ROMULO CACERES',
              representanteLegalCI: '608342',
            },
            {
              estado: 'OK',
              numeroRegistro: '0',
              razonSocial: 'ROMULO CACERES',
              representanteLegalCI: '608342',
            },
          ]);
          return done();
        });
    });

    it('Debe devolver mensaje con error en caso de no encontrar los permisos complementarios del operador con el código de país proporcionado', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/4486/permisos`)
        .set('Accept', 'application/json')
        .query({ pais: 1 })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql([
            {
              estado: 'ERR',
              numeroRegistro: '0',
              razonSocial: null,
              representanteLegalCI: null,
            },
          ]);
          return done();
        });
    });

    it('Debe devolver mensaje con error si no se envía el código de país', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/4486/permisos`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "pais" es necesario');
          return done();
        });
    });

    it('Debe devolver mensaje con error si se código de país con letras', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/4486/permisos`)
        .set('Accept', 'application/json')
        .query({ pais: 'A' })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "pais" solamente puede contener números');
          return done();
        });
    });
  });

  describe('Obtener datos del trámite de permisos complementarios de un operador de transporte', () => {
    it('Debe devolver datos del trámite de permisos complementarios del operador de transporte', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1380%2F2017/tramites`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'OK',
            pais: 'Argentina',
            documentoIdoneidad: '7958',
            hojaRuta: '34563/2017',
            tipoDocSoporte: 'Idoneidad - Certificado Provisorio',
            numeroDocSoporte: '1637/2017',
            fechaEmisionDocSoporte: '14/11/2017',
            fechaExpiracionDocSoporte: '14/02/2018',
            codigoIDVehiculos: '6849',
            razonSocial: 'JARAMILLO EMANUEL SERGIO',
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error en caso de no encontrar el trámite de permisos complementarios del operador', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/1380%2F201/tramites`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'Err No se encontraron datos.',
            pais: null,
            documentoIdoneidad: null,
            hojaRuta: null,
            tipoDocSoporte: null,
            numeroDocSoporte: null,
            fechaEmisionDocSoporte: null,
            fechaExpiracionDocSoporte: null,
            codigoIDVehiculos: null,
            razonSocial: null,
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el código de identificación con formato diferente', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/operadores/13%2F80%2F2017/tramites`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "codigoIdentificacion" solamente puede contener números seguidos de un "/" seguido de números');
          return done();
        });
    });
  });
});
