//this component shows the vehicles fetched from the DB
import React, { useState, useEffect } from "react";
import Input from "./Input";
import EditModal from "./EditModal";

export default function CarsDisplay() {
  //decalred all the state and the setters
  const [cars, setCars] = useState([]);
  const [updatedCar, setUpdatedCar] = useState({
    _id: "",
    Owner: "",
    Make: "",
    Model: "",
    RegistrationNumber: "",
    Address: "",
  });
  const [show, setShow] = useState(false);
  //useEffect hook to display cars when component mounts
  useEffect(() => {
    fetch("/show")
      .then((response) => response.json())
      .then((data) => setCars(data));

    console.log("cars", cars);
    console.table(cars);
  }, []);

  function showCars() {
    fetch("/show")
      .then((response) => response.json())
      .then((data) => setCars(data));

    console.log("cars", cars);
    console.table(cars);
  }

  //function to remove a car based on the _id
  function removeCar(e) {
    const _id = e.target.dataset.id;
    fetch(`/remove/${_id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;" },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Removed car with id ${data.car_id}`);
      });
    showCars();
  }
  //opening and closing of the model
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to edit a car
  function editCar(e) {
    setUpdatedCar({
      id: e.target.dataset.id,
      Owner: e.target.dataset.owner,
      Make: e.target.dataset.make,
      Model: e.target.dataset.model,
      RegistrationNumber: e.target.dataset.reg,
    });
    handleShow();
  }
  //returns the vehicles
  return (
    <>
      <Input update={() => showCars()} />
      <div className="cars-wrapper">
        <EditModal
          // updateCar={updateCar}
          data-id={cars.id}
          carId={updatedCar.id}
          carModel={updatedCar.Model}
          carMake={updatedCar.Make}
          carOwner={updatedCar.Owner}
          carRegistrationNumber={updatedCar.RegistrationNumber}
          carAddress={updatedCar.Address}
          show={show}
          isShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        {cars?.map((car) => (
          <div className="cars-items" key={car._id} value={car.id}>
            <h2>{car.Make}</h2>
            <span>Car's make</span>
            <h2>{car.Model}</h2>
            <span>Car's model</span>
            <h2>{car.Owner}</h2>
            <span>Car's owner</span>
            <h2>{car.RegistrationNumber}</h2>
            <span>Car's registration number</span>
            <h2>{car.Address}</h2>
            <span>Owner's address</span>
            <button
              className="delete-button button"
              data-id={car._id}
              onClick={(e) => removeCar(e)}
            >
              Delete car
            </button>
            <button
              className="edit-button button"
              data-id={car._id}
              data-make={car.Make}
              data-model={car.Model}
              data-owner={car.Owner}
              data-reg={car.RegistrationNumber}
              data-address={car.Address}
              onClick={(e) => editCar(e)}
            >
              Edit car
            </button>
          </div>
        ))}
        ;
      </div>
    </>
  );
}
