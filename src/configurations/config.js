const app = require('./app');
const services = require('./services');

module.exports = () => {
  const config = {
    app,
    services,
  };

  return config;
};
