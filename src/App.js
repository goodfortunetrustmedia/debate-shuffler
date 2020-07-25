import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import logo from "./logo.svg";

import "./App.css";

import Button from "react-bootstrap/Button";

import Menu from "./components/Menu";
import Main from "./components/Main";
import History from "./components/History";
import Shuffler from "./components/Shuffler";

/*
todo: shuffle
todo: shuffle optimiser
todo: record debate setup
*/

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
    { name: "Pema", room: "main" },
    { name: "Tsewang", room: "main" },
    { name: "Tina", room: "breakout" },
    { name: "Alan", room: "breakout" },
    { name: "Chodzom", room: "breakout" },
  ]);
  const [debateHistory, setDebateHistory] = useState([
    {
      id: "abc",
      date: moment().format("YYYY-MM-DD"),
      debators: ["Vincent", "Pamo"],
    },
    {
      id: "ab2c",
      date: moment().format("YYYY-MM-DD"),
      debators: ["Patrick", "Alan"],
    },
  ]);

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
        return (
          <History
            persons={persons}
            debateHistory={debateHistory}
            handleAddDebate={handleAddDebate}
            handleDeleteDebate={handleDeleteDebate}
          />
        );
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
      ![...persons]
        .map((p) => {
          return p.name.toLowerCase();
        })
        .includes(delPerson.toLowerCase())
    ) {
      alert("Person doesn't exist in list of people. Check the name");
    } else {
      let deleteChoice = window.confirm(
        "This will delete all history of this person as well - continue?"
      );
      if (deleteChoice) {
        setPersons(
          [...persons].filter((p) => {
            return p.name.toLowerCase() !== delPerson.toLowerCase();
          })
        );
        let newDebateHistory = [...debateHistory].filter((h) => {
          let debators = h.debators.map((p) => {
            return p.toLowerCase();
          });
          return !debators.includes(delPerson.toLowerCase());
        });
        setDebateHistory(newDebateHistory);
      }
    }
  };

  const handleLoadData = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = JSON.parse(e.target.result);
      setPersons(data.persons);
      setDebateHistory(data.debateHistory);
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleSaveData = () => {
    const fileData = JSON.stringify({
      persons: persons,
      debateHistory: debateHistory,
    });
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "TKSLDebateData_" + moment().format("YYYYMMDD") + ".json";
    link.href = url;
    link.click();
  };

  const handleAddDebate = (debateEntry) => {
    if (!debateEntry.debators[0] || !debateEntry.debators[1]) {
      alert(
        "Select both a challenger and a respondent before adding a debate record"
      );
    } else {
      let newDebateHistory = [...debateHistory, debateEntry];
      setDebateHistory(newDebateHistory);
    }
  };

  const handleDeleteDebate = (debateEntryID) => {
    let newDebateHistory = debateHistory.filter((d) => d.id !== debateEntryID);
    setDebateHistory(newDebateHistory);
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <Menu
          currentPage={currentPage}
          password={password}
          handleNavButton={handleNavButton}
          handlePasswordChange={handlePasswordChange}
          handleSaveData={handleSaveData}
          handleLoadData={handleLoadData}
        />
        <div className="container-fluid mt-3"></div>
        {getPage()}
      </div>
    </div>
  );
}

export default App;
