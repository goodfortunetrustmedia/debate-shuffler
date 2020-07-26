import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

import PersonList from "./PersonList";

function Main(props) {
  const [targetPerson, setTargetPerson] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h5>Main Room</h5>
          <PersonList
            persons={props.persons}
            roomType={"main"}
            handleMovePersonToRoom={props.handleMovePersonToRoom}
          />
        </div>
        <div className="col-6">
          <h5>Breakout Rooms</h5>
          <PersonList
            persons={props.persons}
            roomType={"breakout"}
            handleMovePersonToRoom={props.handleMovePersonToRoom}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Add new person or delete person by typing in their name"
              value={targetPerson}
              onChange={(e) => {
                setTargetPerson(e.target.value);
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={(e) => {
                  props.handleAddPerson(targetPerson);
                  setTargetPerson("");
                }}
              >
                Add Person
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={(e) => {
                  props.handleDeletePerson(targetPerson);
                  setTargetPerson("");
                }}
              >
                Delete Person
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
