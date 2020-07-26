import React, { useRef } from "react";

import Button from "react-bootstrap/Button";

function Menu(props) {
  const hiddenFileInput = useRef(null);

  const handleLoadClick = (e) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="row bg-dark p-2">
      <div className="col-12">
        <Button
          variant={props.currentPage === "Main" ? "primary" : "light"}
          className="float-left m-1"
          onClick={() => props.handleNavButton("Main")}
        >
          Setup
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

        <button
          className="btn btn-success float-none m-1"
          onClick={() => props.handleSaveData()}
        >
          Save Data
        </button>
        <button
          className="btn btn-warning float-none m-1"
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
