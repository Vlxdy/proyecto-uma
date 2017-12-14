const express = require('express');
const consign = require('consign');
const boot = require('./src/init/boot');

const env = process.env.NODE_ENV;
const app = express();

consign({ verbose: true, cwd: 'src' })
  .include('init/middlewares/before_all.js')
  .then('configurations/config.js')
  .then('bls')
  .then('routes')
  .include('init/middlewares/after_routes.js')
  .into(app);

if (env !== 'test') {
  boot(app, env);
}

module.exports = app;
