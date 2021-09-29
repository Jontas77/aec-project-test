/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";

const Competitions = ({ page, setPage }) => {
  const [comp, setComp] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  const handleClick = () => {
    setComp(true);
  };

  const getCompetitions = async () => {
    try {
      const response = await fetch("/api/student/competitions", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();

      setCompetitions(parseResponse);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  return (
    <>
      <div className="project-container">
        <div className="projects-sidebar">
          <h2 className="mb-5">Competitions</h2>
          <div className="back">
            <i className="fas fa-arrow-left" onClick={() => setPage("")}>
              {"  "}Go Back
            </i>
          </div>
          <div className="new-project">
            <i className="fas fa-plus" onClick={handleClick}>
              {"  "}Add New Proposal
            </i>
          </div>
        </div>
        <div className="projects-main">
          {comp === true ? <AddProposal /> : (!competitions ? (<h3>--No competitions to display--</h3>) : (competitions.map((comp, idx) => {
            return (
              <ul key={idx}>
                <li style={{ listStyle: "none", textAlign: "center" }}>
                  <h2>{comp.title}</h2>
                </li>
                <li style={{ listStyle: "none" }}>{comp.description}</li>
                <li style={{ listStyle: "none" }}>Contact: {comp.contact}</li>
              </ul>
            );
          })
          ))}
        </div>
      </div>
    </>
  );
};

export default Competitions;
