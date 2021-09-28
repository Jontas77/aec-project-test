
import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Button, TextField } from "@mui/material";


const ProjectTemplate = ({ setAuth }) => {

  const CHARACTER_LIMIT = 255;

  const [projectName, setProjectName] = useState("");
  const [projectTargetGroup, setProjectTargetGroup] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState([]);

  const project_name = projectName;
  const project_target_group = projectTargetGroup;
  const project_description = projectDescription;

  const handleProjectName = (e) => {
    e.preventDefault();
    setProjectName(e.target.value);
  };

  const handleProjectTargetGroup = (e) => {
    e.preventDefault();
    setProjectTargetGroup(e.target.value);
  };

  const handleProjectDescription = (e) => {
    e.preventDefault();
    setProjectDescription(e.target.value);
  };

  const handlePSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { project_name, project_target_group, project_description };

      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setProjects([...projects, res]);
      setProjectName("");
      setProjectTargetGroup("");
      setProjectDescription("");

    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div>
      <Container
        style={{ width: "100%" }}
      >
        <Button
        onClick={() => setAuth(false)}
        variant='contained'
      >
          Back
        </Button>
        <br />
        <br />
        <TextField
          required
          id="project-name"
          label="Project Name"
          placeholder="What is the name of your project?"
          variant="outlined"
          style={{ width: "100%" }}
          value={projectName}
          onChange={handleProjectName}
        />
        <br />
        <br />
        <TextField
          required
          id="outlined-basic"
          label="Who"
          variant="outlined"
          placeholder='Who are you trying to help?'
          style={{ width: "100%" }}
          value={projectTargetGroup}
          onChange={handleProjectTargetGroup}
        />
        <br />
        <br />
        <TextField
          required
          id="outlined-multiline-static"
          label="Problem"
          placeholder='Tell us about the problem you want to solve...'
          multiline
          rows={10}
          inputProps={{
            maxLength: CHARACTER_LIMIT,
          }}
          style={{ width: "100%" }}
          value={projectDescription}
          onChange={handleProjectDescription}
        />
        <br />
        <br />
        <div>
          <Button
            id='submit'
            variant="contained"
            size='large'
            onClick={handlePSubmit}
            color='primary'
          >
            Create Project
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProjectTemplate;
