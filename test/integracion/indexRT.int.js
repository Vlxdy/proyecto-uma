/* eslint no-undef: 0 */
const configurations = app.configurations.config;
const propiedades = require('../../package.json');

describe('Ruta de estado del servicio', () => {
  describe('Estado del servicio', () => {
    it('Debe devolver la ruta del estado del servicio', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/estado`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.estado).to.eql(`El servicio de ${propiedades.datosServicio.entidad} v${propiedades.datosServicio.version} se encuentra disponible`);
          return done();
        });
    });

    it('Debe devolver la versión del servicio desplegada', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/despliegue`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.version).to.eql(`${propiedades.version}`);
          return done();
        });
    });
  });
});
