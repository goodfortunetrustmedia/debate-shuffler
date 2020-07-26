import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Button from "react-bootstrap/Button";

function Shuffler(props) {
  const [debatorA, setDebatorA] = useState(0);
  const [debatorB, setDebatorB] = useState(0);
  const [shuffleProgress, setShuffleProgress] = useState(0);

  useEffect(() => {}, []);

  const shufflePersonPairs = () => {
    let personArray = [...props.persons].filter((p) => {
      return p.room === "breakout";
    });
    for (let i = personArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = personArray[i];
      personArray[i] = personArray[j];
      personArray[j] = temp;
    }
    let debatePairs = [];
    for (let i = 0; i < personArray.length; i += 2) {
      try {
        debatePairs.push([personArray[i].name, personArray[i + 1].name]);
      } catch (e) {
        debatePairs.push([personArray[i].name, personArray[i].name]);
      }
    }
    let debateHistoryMatchup = debatePairs.map((d) => {
      return {
        id: uuidv4(),
        date: moment().format("YYYY-MM-DD"),
        debators: d,
      };
    });
    return {
      matchup: debateHistoryMatchup,
      score: getTotalMatchupScore(debateHistoryMatchup),
    };
  };

  const renderPersons = () => {
    return props.persons.map((p) => {
      return (
        <option key={p.name} value={p.name}>
          {p.name}
        </option>
      );
    });
  };

  const handleAddDebate = (debateEntry) => {
    if (!debateEntry.debators[0] || !debateEntry.debators[1]) {
      alert(
        "Select both a challenger and a respondent before adding a debate record"
      );
    } else {
      let newDebateHistory = [...props.currentMatchup, debateEntry];
      props.handleSetMatchup(newDebateHistory);
    }
  };

  const handleDeleteDebate = (id) => {
    let newDebateHistoryMatchup = props.currentMatchup.filter(
      (d) => d.id !== id
    );
    props.handleSetMatchup(newDebateHistoryMatchup);
  };

  const renderTableData = () => {
    return props.currentMatchup.map((d) => {
      return (
        <tr key={d.id}>
          <td>{d.date}</td>
          <td>
            {d.debators[0] === d.debators[1]
              ? d.debators[0] + " in group of 3"
              : d.debators.join(" vs ")}
          </td>
          <td>{scoreDebatePairHistory(d.debators)}</td>
          <td>
            <Button
              className="btn-sm my-0 py-0"
              variant="danger"
              style={{ verticalAlign: "top" }}
              onClick={() => {
                handleDeleteDebate(d.id);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  const handleReshuffle = () => {
    let shuffleScore = 1e6;
    let matchup = [];
    let minIterations = 200;
    let i = 0;
    while (i < minIterations) {
      let result = shufflePersonPairs();
      let newShuffleScore = 1e6;
      let newMatchup = [];
      newMatchup = result.matchup;
      newShuffleScore = result.score;
      if (newShuffleScore < shuffleScore) {
        matchup = [...newMatchup];
        shuffleScore = newShuffleScore;
        i = 0;
      } else {
        i++;
      }
    }
    props.handleSetMatchup(matchup);
  };

  const scoreDebatePairHistory = (debatePair) => {
    let debateCount = props.debateHistory.map((d) => {
      if (
        (debatePair[0] === d.debators[0] && debatePair[1] === d.debators[1]) ||
        (debatePair[0] === d.debators[1] && debatePair[1] === d.debators[0])
      ) {
        return 1;
      }
      return 0;
    });
    return debateCount.reduce((a, b) => a + b, 0);
  };

  const getTotalMatchupScore = (matchup) => {
    let totalScore = matchup
      .map((p) => {
        return scoreDebatePairHistory(p.debators);
      })
      .reduce((a, b) => a + b, 0);
    return totalScore;
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-12">
          <div className="input-group">
            <select
              className="custom-select"
              value={debatorA}
              onChange={(e) => {
                setDebatorA(e.target.value);
              }}
            >
              <option disabled value={0}>
                Choose Challenger
              </option>
              {renderPersons()}
            </select>
            <select
              className="custom-select"
              value={debatorB}
              onChange={(e) => {
                setDebatorB(e.target.value);
              }}
            >
              <option disabled value={0}>
                Choose Respondent
              </option>
              {renderPersons()}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={(e) => {
                  handleAddDebate({
                    id: uuidv4(),
                    date: moment().format("YYYY-MM-DD"),
                    debators: [debatorA, debatorB],
                  });
                  setDebatorA(0);
                  setDebatorB(0);
                }}
              >
                Add manual debate entry
              </button>
            </div>
          </div>

          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Debators</th>
                <th>Times Debated</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>

          <Button
            className="btn"
            variant="outline-success"
            style={{ verticalAlign: "top" }}
            onClick={() => {
              props.handleSaveMatchup(props.currentMatchup);
            }}
          >
            Save Matchup to History
          </Button>
          <Button
            className="btn ml-2"
            variant="outline-danger"
            style={{ verticalAlign: "top" }}
            onClick={() => {
              handleReshuffle();
            }}
          >
            Reshuffle Debate Pairs
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Shuffler;
