import { Button } from "@mui/material";
import React from "react";

const Proposals = ({ proposals, page, setPage }) => {
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
      {proposals.map(({ proposal_name, problem_statemnt }) => {
        return (page === "" ? (
          <h3>--No proposals to display--</h3>
        ) : (
          <div key={proposal_name}>
            <div className="card mb-3" >
              <div className="row g-0">
                <div className="col-md-4">
                    <img src='https://media.istockphoto.com/photos/teach-kids-how-far-a-little-care-can-go-picture-id974643844?b=1&k=20&m=974643844&s=170667a&w=0&h=Vo_xEoXfrr3sWxwCVGkMite1hp_nemAYNERDvKMBsYA=' className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{proposal_name}</h5>
                    <p className="card-text">{problem_statemnt}</p>
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

export default Proposals;
