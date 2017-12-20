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
});
