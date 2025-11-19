const app = require("./app");
const services = require("./services");

module.exports = (appe) => {
  const config = {
    app,
    services,
  };
  if (appe) appe.set("config", config);

  // return config;
};
