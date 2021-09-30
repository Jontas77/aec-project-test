import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";


const Competitions = ({ page, setPage }) => {

  const [competitions, setCompetitions] = useState([]);

  const getCompetitions = async () => {
    try {
      const response = await axios.get("/api/competition");
      const data = response.data;
      console.log(data);
      setCompetitions(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCompetitions();
  }, [page]);


  return (
        <div>
          <div>
            <Button
              onClick={() => setPage("")}
              variant='contained'
            >
              Go back
            </Button>
          </div>
            <br />
            <br />
            {competitions.map(({ comp_title, comp_desc, contact_pers }) => {
            return (page === "" ? (
              <h3>--No competitions to display--</h3>
            ) : (
              <div key={comp_desc}>
                <div className="card mb-3" >
                  <div className="row g-0">
                    <div className="col-md-4">
                        <img src='https://media.istockphoto.com/photos/weve-each-got-our-own-dreams-to-nurture-picture-id928855698?b=1&k=20&m=928855698&s=170667a&w=0&h=SFBkvgsUgNF6ANXRKi_JEq4ejUNAtSzbnp05BEUwpUY=' className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{comp_title}</h5>
                        <p className="card-text">{comp_desc}</p>
                        <h5 className="card-title">{contact_pers}</h5>
                        {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
  );
};

export default Competitions;
