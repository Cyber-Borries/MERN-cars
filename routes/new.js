//create new car route
module.exports = function (app) {
  const cars = require("../controllers/cars.controller.js");
  app.post("/add", cars.create);
};
