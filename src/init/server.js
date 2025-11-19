const express = require('express');
const middlewaresBefore = require('./middlewares/before_all');
const middlewaresAfter = require('./middlewares/after_routes');
const configs = require('../configs');
const routes = require('../routes');

const app = express();
app.use(express.json({limit: '50mb'}));
middlewaresBefore(app);

configs(app);

routes(app);

middlewaresAfter(app);

module.exports = app;
