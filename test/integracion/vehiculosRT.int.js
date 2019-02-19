/* eslint no-undef: 0 */
const configurations = app.configurations.config;
const propiedades = require('../../package.json');

describe('Ruta de consumo', () => {
  describe('Obtener datos de tarjetas de vehículos vigentes de un operador de transporte', () => {
    it('Debe devolver los datos de una tarjeta de vehículos vigentes', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/4403HUU/tarjetas/5979`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'OK',
            tipoTarjeta: 'NE',
            nit: '181682029',
            numeroRegistro: '1517',
            color: 'ANARANJADO COMBINADO',
            marca: 'VOLVO',
            modelo: '2011',
            chasis: 'YV2AG30CXBA702972',
            capacidadCarga: '24,00',
            tipoTransporte: 'Carga',
            tipoVehiculo: 'Tracto Camion',
            fechaInicio: '30/11/2017',
            fechaFin: '30/11/2019',
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error en caso de no encontrar datos de tarjeta para el operador con el número de placa proporcionado', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/4403HU/tarjetas/5979`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'ERR',
            tipoTarjeta: null,
            nit: null,
            numeroRegistro: null,
            color: null,
            marca: null,
            modelo: null,
            chasis: null,
            capacidadCarga: null,
            tipoTransporte: null,
            tipoVehiculo: null,
            fechaInicio: null,
            fechaFin: null,
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el número de placa sin formato correcto', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/4403sHU7/tarjetas/5979`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "placa" solamente puede contener números seguidos de letras mayúsculas');
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el número de tarjeta con letras', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/4403HUU/tarjetas/59A79`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "numeroTarjeta" solamente puede contener números');
          return done();
        });
    });
  });

  describe('Obtener datos de la última tarjeta de vehículos de un operador de transporte', () => {
    it('Debe devolver los últimos datos de una tarjeta de vehículo', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/4403HUU/tarjetas`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'OK',
            tipoTarjeta: 'NE',
            nit: '181682029',
            numeroRegistro: '1517',
            color: 'ANARANJADO COMBINADO',
            marca: 'VOLVO',
            modelo: '2011',
            chasis: 'YV2AG30CXBA702972',
            capacidadCarga: '24,00',
            tipoTransporte: 'Carga',
            tipoVehiculo: 'Tracto Camion',
            fechaInicio: '30/11/2017',
            fechaFin: '30/11/2019',
            estadoVehiculo: 'True',
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error en caso de no encontrar últimos datos de tarjeta para el operador con el número de placa proporcionado', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/4403HU/tarjetas`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql({
            estado: 'ERR',
            tipoTarjeta: null,
            nit: null,
            numeroRegistro: null,
            color: null,
            marca: null,
            modelo: null,
            chasis: null,
            capacidadCarga: '0',
            tipoTransporte: null,
            tipoVehiculo: null,
            fechaInicio: null,
            fechaFin: null,
            estadoVehiculo: null,
          });
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el número de placa sin formato correcto', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/4403sHU7/tarjetas`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "placa" solamente puede contener números seguidos de letras mayúsculas');
          return done();
        });
    });
  });

  describe('Obtener datos de los permisos complementarios de vehículos de un operador de transporte', () => {
    it('Debe devolver los últimos datos de permisos complementarios de un vehículo', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/160/permisos`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql([
            {
              estado: 'OK',
              numeroRegistro: '0',
              tipoVehiculo: 'CAMION',
              placa: 'DJPT95',
              marca: 'VOLVO',
              chasis: 'YV2A4DBC92A544331',
              modelo: '2002',
              capacidadCarga: '14,00',
              tipoCarroceria: 'PLATAFORMA',
              numeroEjes: '3',
              tipoAutorizacion: 'Alta',
            },
            {
              estado: 'OK',
              numeroRegistro: '0',
              tipoVehiculo: 'REMOLQUE',
              placa: 'JC1256',
              marca: 'GOREN',
              chasis: '8834',
              modelo: '1997',
              capacidadCarga: '13,00',
              tipoCarroceria: 'BARANDA',
              numeroEjes: '2',
              tipoAutorizacion: 'Alta',
            },
          ]);
          return done();
        });
    });

    it('Debe devolver mensaje con error en caso de no encontrar permisos complementarios con el código de vehículo proporcionado', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/683/permisos`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.eql([
            {
              estado: 'Err',
              numeroRegistro: null,
              tipoVehiculo: null,
              placa: null,
              marca: null,
              chasis: null,
              modelo: null,
              capacidadCarga: null,
              tipoCarroceria: null,
              numeroEjes: null,
              tipoAutorizacion: null,
            },
          ]);
          return done();
        });
    });

    it('Debe devolver mensaje con error si se envía el código de vehículo con letras', (done) => {
      request.get(`${configurations.app.baseUrl}/v${propiedades.datosServicio.version}/vehiculos/683A/permisos`)
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.mensaje).to.equal('El parámetro "codigoVehiculo" solamente puede contener números');
          return done();
        });
    });
  });
});
