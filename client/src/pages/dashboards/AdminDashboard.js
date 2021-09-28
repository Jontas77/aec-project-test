import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import ProjectTemplate from "../projects/ProjectTemplate";
import axios from "axios";
import AllProjects from "../projects/AllProjects";


const AdminDashboard = ({ setAuth }) => {

	const [projects, setProjects] = useState([]);
	const [page, setPage] = useState('');

	const getProjects = async () => {
		try {
			const response = await axios.get('/api/project');
			const data = response.data;
			setProjects(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getProjects();
	}, [page]);

	return (
		<div>
			{page === 'template' ? (
				<ProjectTemplate setPage={setPage}/>
			) : page === 'project' ?
					(	<div>
					<AllProjects setPage={setPage} projects={projects} />
					</div>
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
						onClick={()=>setPage('template')}
						variant='contained'
					>
						Create project
					</Button>
					<br />
				<br />
					<Button
						onClick={()=>setPage('project')}
						variant='contained'
					>
						All  projects
					</Button>
					<br />
				<br />			
				</Container>
			)}
			</div>
	);
};

export default AdminDashboard;