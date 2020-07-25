import React from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function Menu(props) {
  return (
    <div className="row bg-dark p-2">
      <div className="col-12">
        <Button
          variant={props.currentPage === "Main" ? "primary" : "light"}
          className="float-left m-1"
          onClick={() => props.handleNavButton("Main")}
        >
          Main
        </Button>
        <Button
          variant={props.currentPage === "History" ? "primary" : "light"}
          className="float-left m-1"
          onClick={() => props.handleNavButton("History")}
        >
          History
        </Button>
        <Button
          variant={props.currentPage === "Shuffler" ? "primary" : "light"}
          className="float-left m-1"
          onClick={() => props.handleNavButton("Shuffler")}
        >
          Shuffler
        </Button>
        <input
          className="float-right align-middle"
          type="password"
          placeholder="Input Password"
          style={{ height: "90%", textAlign: "center" }}
          onChange={(e) => props.handlePasswordChange(e)}
        />
      </div>
    </div>
  );
}

export default Menu;
