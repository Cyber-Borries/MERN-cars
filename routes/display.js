//show cars older than 5 years route
module.exports = function (app) {
  const cars = require("../controllers/cars.controller.js");
  app.get("/display", cars.showCars);
};
