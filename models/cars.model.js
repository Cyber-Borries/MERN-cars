/* Declaring Mongo Schema for the Database interaction  */
const mongoose = require("mongoose");

let CarsSchema = new mongoose.Schema({
  Model: {
    type: Number,
    // required: false,
  },
  Make: {
    type: String,
    // required: false,
  },
  Owner: {
    type: String,
    // required: false,
  },
  RegistrationNumber: {
    type: String,
    // required: false,
  },
  Address: {
    type: String,
    // required: false,
  },
});

/*Exporting the schema/model
Below is an example of how you create a model using the model() method. The two arguments you pass to this method are:  
The name of the model 
the schema object you created in the previous step
*/
module.exports = mongoose.model("cars", CarsSchema);
