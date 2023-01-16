//bootstrap's modal to allow a user to edit a vehicle

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditModal(props) {
  //decalred state and the setters
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [owner, setOwner] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [updatedCars, setUpdatedCars] = useState({
    id: props.carId,
    Owner: owner,
    Make: make,
    Model: model,
    RegistrationNumber: registrationNumber,
    Address: address,
  });

  //adding user input to state to be able to update the DB
  const editCarInfo = (e) => {
    e.preventDefault();
    setUpdatedCars({
      id: props.carId,
      Owner: owner,
      Make: make,
      Model: model,
      RegistrationNumber: registrationNumber,
      Address: address,
    });
    editCar();
  };

  function editCar(e) {
    console.log(owner);
    console.log(updatedCars);
    const _id = updatedCars._id;
    console.log(_id);
    fetch(`/update/${_id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedCars),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Updated car}`);
      });
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Update the car's details here.</h1>
            <span>
              Please enter all details as empty fields will result in empty
              results 🙂
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>You are editing the car with id {props.carId}</h1>
          <form onSubmit={editCarInfo}>
            <input
              type="text"
              placeholder={props.carMake}
              name="make"
              onChange={(e) =>
                setUpdatedCars((prevInfo) => ({
                  ...prevInfo,
                  id: props.carId,
                  Make: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="Model"
              name="model"
              onChange={(e) =>
                setUpdatedCars((prevInfo) => ({
                  ...prevInfo,
                  Model: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Owner"
              name="owner"
              onChange={(e) =>
                setUpdatedCars((prevInfo) => ({
                  ...prevInfo,
                  Owner: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="RegistrationNumber"
              name="registrationNumber"
              onChange={(e) =>
                setUpdatedCars((prevInfo) => ({
                  ...prevInfo,
                  RegistrationNumber: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={(e) =>
                setUpdatedCars((prevInfo) => ({
                  ...prevInfo,
                  Address: e.target.value,
                }))
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editCarInfo} data-id={props.carId}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

{
  /* <Modal.Dialog show={props.show} onHide={props.handleClose}>
<Modal.Header closeButton>
  <Modal.Title>
    <h1> </h1>
  </Modal.Title>
</Modal.Header>

<Modal.Body></Modal.Body>

<Modal.Footer>
  <Button variant="secondary" onClick={props.handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={props.handleClose}>
    Save changes
  </Button>
</Modal.Footer>
</Modal.Dialog> */
}
