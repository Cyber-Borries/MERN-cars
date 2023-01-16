//update route

module.exports = function (app) {
  const cars = require("../controllers/cars.controller.js");
  app.put("/update/:car_id", cars.updateByOwner);
};

module.exports = function (app) {
  const cars = require("../controllers/cars.controller.js");
  app.put("/updateMany", cars.updateManyByYear);
};
