import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

function PersonList(props) {
  const [selectedPersons, setSelectedPersons] = useState([]);

  const filterPersonList = () => {
    let persons = props.persons.filter((p) => {
      return p.room === props.roomType;
    });
    return persons;
  };

  const handleSelectPersonChange = (e) => {
    setSelectedPersons(
      [...e.target.selectedOptions].map((o) => {
        return o.value;
      })
    );
  };

  return (
    <div>
      <select
        multiple
        size="15"
        style={{ width: "100%" }}
        onChange={(e) => handleSelectPersonChange(e)}
      >
        {filterPersonList().map((p) => {
          return (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          );
        })}
      </select>
      <Button
        className="m-1"
        variant={"primary"}
        onClick={(e) => {
          props.handleMovePersonToRoom(selectedPersons);
        }}
      >
        {props.roomType === "main" ? "Move Person >>" : "<< Move Person"}
      </Button>
    </div>
  );
}

export default PersonList;
