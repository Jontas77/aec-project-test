import React from "react";

const AllProjects = ({ projects, project }) => {
  return (
    <div>
      {projects.map(({ project_name, project_description, project_image, project_target_group }) => {
        return project === "" ? (
          <h3>--No projects to display--</h3>
        ) : (
          <div key={project_name}>
            <div className="card mb-3" >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={project_image} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{project_name} created by {project_target_group}</h5>
                    <p className="card-text">{project_description}</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProjects;
