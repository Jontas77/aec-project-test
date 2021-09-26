/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import AddProject from "./AddProject";

const Projects = ({ setPage }) => {
	const [project, setProject] = useState(false);
	const [projects, setProjects] = useState([]);

	const handleClick = () => {
		setProject(true);
	};

	const getProjects = async () => {
		try {
			const response = await fetch("/api/student/projects", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			const parseResponse = await response.json();

			setProjects(parseResponse);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<>
			<div className="project-container">
				<div className="projects-sidebar">
					<h2 className="mb-5">My Projects</h2>
					<div className="back">
						<i className="fas fa-arrow-left" onClick={() => setPage("")}>
							{"  "}Go Back
						</i>
					</div>
					<div className="new-project">
						<i className="fas fa-plus" onClick={handleClick}>
							{"  "}Add Project
						</i>
					</div>
				</div>
				<div className="projects-main">
					{project === true ? (
						<AddProject />
					) : (
						projects.map((proj, idx) => {
							return proj === "" ? (
								<h3>--No projects to display--</h3>
							) : (
								<ul key={idx}>
									<li style={{ listStyle: "none", textAlign: "center" }}>
										<h2>{proj.project_name}</h2>
									</li>
									<li style={{ listStyle: "none" }}>{proj.project_desc}</li>
								</ul>
							);
						})
					)}
				</div>
			</div>
		</>
	);
};

export default Projects;
