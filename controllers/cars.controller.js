/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const Cars = require("../models/cars.model.js");
//create a new car
exports.create = function (req, res) {
  console.log(req.body);
  // Create and Save a new car
  let carsModel = new Cars({
    Model: req.body.Model,
    Make: req.body.Make,
    Owner: req.body.Owner,
    RegistrationNumber: req.body.RegistrationNumber,
  });
  const carSave = carsModel.save();
  res.send(carsModel);
};
//find all car
exports.findAll = function (req, res) {
  Cars.find(function (err, test) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "An error occurred while retrieving the cars." });
      console.log("findAll error");
    } else {
      res.send(test);
      console.log("findAll");
    }
  });
};
//update a new car
exports.updateByOwner = function (req, res) {
  // let query = { Owner: req.body.Owner };
  let query = req.body;
  // const { car_id } = req.params;
  let filter = { _id: req.body.id };

  Cars.findOneAndUpdate(
    filter,
    {
      Owner: query.Owner,
      Make: query.Make,
      Model: query.Model,
      RegistrationNumber: query.RegistrationNumber,
      Address: query.Address,
    },
    //returns new updated data = new:true
    { new: true },
    function (err) {
      if (err) {
        console.log("Something wrong when updating data!");
        res.send("ERROR: Not Updated. " + err);
      }
      res.send({
        message: `Car with id ${car_id} updated succefully`,
      });
    }
  );
};
//delete a new car
exports.deleteCarsByOwner = function (req, res) {
  const { car_id } = req.params;
  Cars.findByIdAndDelete(car_id, function (err) {
    if (err) {
      console.log(`ERROR: Car NOT removed. ${err}`);
      res.send(`ERROR: Car NOT removed. ${err}`);
    }
    res.json({
      car_id,
      message: `Car with id ${car_id} removed succefully`,
    });
  });
};
//show cars older than 5 years
exports.showCars = function (req, res) {
  Cars.find({ Model: { $lt: 2015 } }, function (err, test) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "An error occurred while retrieving the cars." });
      console.log("findAll error");
    } else {
      res.send(test);
      console.log("find 5 year");
    }
  });
};

// exports.updateMany = function (req, res) {
//   let query = req.body;
//   let filter = { Owner: req.body.owner };
//   Cars.updateMany(
//     filter,
//     {
//       Owner: query.Owner,
//       Make: query.Make,
//       Model: query.Model,
//       RegistrationNumber: query.RegistrationNumber,
//       Address: query.Address,
//     },
//     //returns new updated data = new:true
//     { new: true },
//     function (err, test) {
//       if (err) {
//         console.log(err);
//         res
//           .status(500)
//           .send({ message: "An error occurred while retrieving the cars." });
//         console.log("findAll error");
//       } else {
//         res.send(test);
//         console.log("find 5 year");
//       }
//     }
//   );
// };

exports.updateManyByYear = function (req, res) {
  let query = req.body;
  let filter = { Model: { $lt: 2023 } };

  Cars.updateMany(
    filter,
    {
      Owner: query.Owner,
      Make: query.Make,
      Model: query.Model,
      RegistrationNumber: query.RegistrationNumber,
      Address: query.Address,
    },
    //returns new updated data = new:true
    { new: true },
    function (err) {
      if (err) {
        console.log("Something wrong when updating data!");
        res.send("ERROR: Not Updated. " + err);
      }
      res.send({
        message: `Cars updated succefully`,
      });
    }
  );
};

//   db.<Table_Name_Here>.find({ "Model": {$lt : 2015} })
