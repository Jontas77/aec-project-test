import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import ProjectA from "../projects/ProjectA";
import axios from "axios";


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
		console.log('cleanup')
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
					<div>
						{project && <ProjectA />}
					</div>
									<br />
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
								</div>
				</Container>
			</div>
	);
};

export default AdminDashboard;
