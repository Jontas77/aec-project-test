import { Button } from "@mui/material";
import React from "react";

const AllProposals = ({ proposals, page, setPage }) => {
  return (
    <div>
      <div>
      <Button
        onClick={() => setPage('')}
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
                    <img src='https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNvY2lhbCUyMGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60' className="img-fluid rounded-start" alt="..." />
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

export default AllProposals;
