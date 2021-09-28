import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import ProjectTemplate from "../projects/ProjectTemplate";
import axios from "axios";
import AllProjects from "../projects/AllProjects";


const AdminDashboard = ({ setAuth }) => {

	const [projects, setProjects] = useState([]);
	const [template, setTemplate] = useState(false)

	const handleClick = () => {
		setTemplate(true);
	};

	const getProjects = async () => {
		try {
			const response = await axios.get('/api/project');
			const data = response.data;
			console.log(data)
			setProjects(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getProjects();
	}, [template]);

	return (
		<div>
			{template === true ? (
				<ProjectTemplate />
			) : (
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
					<Button
						onClick={handleClick}
						variant='contained'
					>
						Create project
					</Button>
					<br />
				<br />
				<div>
					<AllProjects template={template} projects={projects} />
				</div>
				</Container>
			)}
			</div>
	);
};

export default AdminDashboard;
