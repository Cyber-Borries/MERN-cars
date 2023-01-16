//delete route
module.exports = function (app) {
  const cars = require("../controllers/cars.controller.js");
  app.delete("/remove/:car_id", cars.deleteCarsByOwner);
};
