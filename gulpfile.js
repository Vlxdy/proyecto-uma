const gulp = require('gulp');
const apidoc = require('gulp-api-doc');
const propiedades = require('./package.json');
const replace = require('gulp-replace');
const file = require('gulp-file');
const configs = require('./src/configurations/config');

// información que se necesita para generar el índice de la documentación
const info = {
  descripcion: propiedades.datosServicio.descripcion,
  nombre: propiedades.description,
  url: `${configs().app.baseUrl}/v${propiedades.datosServicio.version}`,
};

gulp.task('apidoc', () => {
  return gulp.src('src/routes')
    .pipe(apidoc({
      template: './api_doc_template',
    }))
    .pipe(replace('<version-servicio>', propiedades.datosServicio.version))
    .pipe(replace('<version-deploy>', propiedades.version))
    .pipe(replace('<base-url>', configs().app.baseUrl))
    .pipe(replace('<nombre-entidad-servicio>', propiedades.datosServicio.entidad))
    .pipe(gulp.dest('public'));
});

gulp.task('createinfo', () => {
  return gulp.src('')
    .pipe(file('info.json', JSON.stringify(info)))
    .pipe(gulp.dest('public'));
});

gulp.task('doc', ['apidoc', 'createinfo']);
