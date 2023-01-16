import React, { useState, useEffect } from "react";

export default function Input(props) {
  const [newCar, setNewCar] = useState({
    Owner: "",
    Make: "",
    Model: "",
    RegistrationNumber: "",
    Address: "",
  });
  const [updatedCar, setUpdatedCar] = useState({
    _id: "",
    Owner: "",
    Make: "",
    Model: "",
    RegistrationNumber: "",
    Address: "",
  });
  const [oldCars, setOldCars] = useState([]);

  const submitCar = (e) => {
    e.preventDefault();

    console.log(newCar);
    addCar();
  };

  function addCar(e) {
    console.log(newCar);
    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    });
    return props.update;
  }

  function showOldCars() {
    fetch("/display")
      .then((response) => response.json())
      .then((data) => setOldCars(data));
    console.log(typeof oldCars);
    console.log(oldCars);
  }

  function editCars(e) {
    console.log(newCar);
    const _id = newCar._id;
    console.log(_id);
    fetch("/updateMany", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Updated car`);
      });
  }

  return (
    <div className="input-wrapper">
      <button className="button" onClick={showOldCars}>
        Show cars older than 5 years
      </button>{" "}
      <button className="button" onClick={editCars}>
        Update many cars
      </button>
      <div className="form-field">
        <form onSubmit={submitCar}>
          <span>Year Model</span>
          <br />
          <input
            type="number"
            name="model"
            onChange={(e) =>
              setNewCar((prevCar) => ({
                ...prevCar,
                Model: e.target.value,
              }))
            }
          ></input>
          <br />
          <span>Car Make</span>
          <br />
          <input
            type="text"
            name="make"
            onChange={(e) =>
              setNewCar((prevCar) => ({
                ...prevCar,
                Make: e.target.value,
              }))
            }
          ></input>
          <br />
          <span>Owner</span>
          <br />

          <input
            type="text"
            name="owner"
            onChange={(e) =>
              setNewCar((prevCar) => ({
                ...prevCar,
                Owner: e.target.value,
              }))
            }
          ></input>
          <br />
          <span>Registration number</span>
          <br />

          <input
            type="text"
            name="registrationNumber"
            onChange={(e) =>
              setNewCar((prevCar) => ({
                ...prevCar,
                RegistrationNumber: e.target.value,
              }))
            }
          ></input>
          <br />
          <span>Address</span>
          <br />

          <input
            type="text"
            name="address"
            onChange={(e) =>
              setNewCar((prevCar) => ({
                ...prevCar,
                Address: e.target.value,
              }))
            }
          ></input>
          <br />

          <button
            className="submit-button button"
            type="submit"
            onClick={addCar}
          >
            Add car
          </button>
          {/* <button className="submit-button button" onClick={showCars}>
            See all cars
          </button>
          <button className="submit-button button" onClick={showSomeCar}>
            See cars older than 5 years
          </button> */}
        </form>
      </div>
      <div>
        {oldCars.map((car) => (
          <div className="cars-wrapper">
            <div className="cars-items">
              <h1>Car older than 5 years</h1>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
