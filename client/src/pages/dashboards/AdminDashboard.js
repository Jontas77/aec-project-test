import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import ProjectTemplate from "../projects/ProjectTemplate";
import axios from "axios";
import AllProjects from "../projects/AllProjects";


const AdminDashboard = ({ setAuth }) => {

	const [project, setProject] = useState(false);
	const [projects, setProjects] = useState([]);

	const handleClick = () => {
		setProject(true);
	};

	const getProjects = async () => {
		try {
			const response = await axios.get("/api/project");
			const data = response.data;
			setProjects(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getProjects();
		console.log("cleanup");
	}, [project]);

	return (
			<div>
				<Container style={{ width: "100%" }}>
					{/* HEADING START*/}
					<Typography variant="h5" component="h2">
						Welcome back admin@sun.ac.za
					</Typography>
					{/* HEADING END */}
					<br />
					<br />
					<Button
						onClick={() => setAuth(false)}
						variant='contained'
					>
						Log out
					</Button>
					<br />
				<br />
				<div>
					<Button
						onClick={handleClick}
						variant='contained'
					>
						Add project
					</Button>
				</div>
				<div>
					{project && <ProjectTemplate />}
				</div>
				<br/>
				<div>
					<AllProjects project={project} projects={projects} />
				</div>
			</Container>
			</div>
	);
};

export default AdminDashboard;
