import React, { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";

import PersonList from "./PersonList";

function Main(props) {
  const [targetPerson, setTargetPerson] = useState("");

  const hiddenFileInput = useRef(null);

  const handleLoadClick = (e) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <PersonList
            persons={props.persons}
            roomType={"main"}
            handleMovePersonToRoom={props.handleMovePersonToRoom}
          />
        </div>
        <div className="col-6">
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
      <div className="row m-3">
        <div className="col">
          <button
            className="btn btn-success m-3"
            onClick={() => props.handleSaveData()}
          >
            Save Data
          </button>
          <button
            className="btn btn-warning m-3"
            onClick={(e) => handleLoadClick(e)}
          >
            Load Data
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={(e) => props.handleLoadData(e)}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
