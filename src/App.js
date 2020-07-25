import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Button from "react-bootstrap/Button";

import Menu from "./components/Menu";
import Main from "./components/Main";
import History from "./components/History";
import Shuffler from "./components/Shuffler";

function App() {
  const [currentPage, setCurrentPage] = useState("Main");

  const [persons, setPersons] = useState([
    { name: "Patrick", room: "breakout" },
    { name: "Ryan", room: "breakout" },
    { name: "Eric", room: "breakout" },
    { name: "Casey", room: "breakout" },
    { name: "Pamo", room: "breakout" },
    { name: "Vincent", room: "breakout" },
    { name: "Gonpo", room: "main" },
    { name: "Lisa", room: "main" },
  ]);
  const [debateHistory, setDebateHistory] = useState();

  const [password, setPassword] = useState("tksldebate");
  const correctPassword = "tksldebate";

  const getPage = () => {
    if (password === correctPassword) {
      if (currentPage === "Main") {
        return (
          <Main
            persons={persons}
            handleMovePersonToRoom={handleMovePersonToRoom}
            handleAddPerson={handleAddPerson}
            handleDeletePerson={handleDeletePerson}
          />
        );
      } else if (currentPage === "History") {
        return <History />;
      } else if (currentPage === "Shuffler") {
        return <Shuffler />;
      }
    } else {
      return (
        <div className="row">
          <div className="col-12">
            <h3>Enter Password to Continue</h3>
          </div>
        </div>
      );
    }
  };

  const handleNavButton = (page) => {
    if (password === correctPassword) {
      if (page === "Main") {
        setCurrentPage("Main");
      } else if (page === "History") {
        setCurrentPage("History");
      } else if (page === "Shuffler") {
        setCurrentPage("Shuffler");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMovePersonToRoom = (selectedPersons) => {
    let newPersonState = [...persons];
    console.log(newPersonState);
    newPersonState.forEach((p) => {
      if (selectedPersons.includes(p.name)) {
        p.room = p.room === "main" ? "breakout" : "main";
      }
      return p;
    });
    setPersons(newPersonState);
  };

  const handleAddPerson = (newPerson) => {
    // check person doesn't exist
    if (
      [...persons]
        .map((p) => {
          return p.name.toLowerCase();
        })
        .includes(newPerson.toLowerCase())
    ) {
      alert("Person already exists. Choose a unique name");
    } else {
      setPersons([...persons, { name: newPerson, room: "main" }]);
    }
  };

  const handleDeletePerson = (delPerson) => {
    // check person exists
    if (
      [...persons]
        .map((p) => {
          return p.name.toLowerCase();
        })
        .includes(delPerson.toLowerCase())
    ) {
      setPersons(
        [...persons].filter((p) => {
          return p.name.toLowerCase() !== delPerson.toLowerCase();
        })
      );
    } else {
      alert("Person doesn't exist in list of people. Check the name");
    }
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <Menu
          currentPage={currentPage}
          password={password}
          handleNavButton={handleNavButton}
          handlePasswordChange={handlePasswordChange}
        />
        <div className="container-fluid mt-3"></div>
        {getPage()}
      </div>
    </div>
  );
}

export default App;
