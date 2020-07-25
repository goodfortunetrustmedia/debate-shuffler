import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Button from "react-bootstrap/Button";

function History(props) {
  const [debatorA, setDebatorA] = useState(0);
  const [debatorB, setDebatorB] = useState(0);

  const renderTableData = () => {
    return props.debateHistory.map((d) => {
      return (
        <tr key={d.id}>
          <td>{d.date}</td>
          <td>{d.debators.join(" vs ")}</td>
          <td>
            <Button
              className="btn-sm my-0 py-0"
              variant="danger"
              style={{ verticalAlign: "top" }}
              onClick={() => {
                props.handleDeleteDebate(d.id);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
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
                  props.handleAddDebate({
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
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Debators</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
