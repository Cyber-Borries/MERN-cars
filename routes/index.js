//show cars route
module.exports = function (app) {
  const cars = require("../controllers/cars.controller.js");
  app.get("/", cars.findAll);
};
