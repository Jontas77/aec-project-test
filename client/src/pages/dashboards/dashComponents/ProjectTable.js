import React, { useState, useEffect } from "react";

const ProjectTable = () => {
	const [table, setTable] = useState(false);
	const [projects, setProjects] = useState([]);

	const getProjects = async () => {
		try {
			const response = await fetch("/api/student/projects", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			const parseResponse = await response.json();
			console.log(parseResponse);
			setProjects(parseResponse);
			setTable(true);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<>
			<div className="project-table">
				<h3>Project Proposals</h3>
				<table className="table table-hover mt-5">
					<thead>
						<tr>
							<th scope="col" style={{ width: "10%" }}>
								#
							</th>
							<th scope="col" style={{ width: "15%" }}>
								Project Name
							</th>
							<th scope="col" style={{ width: "20%" }}>
								Problem Statement
							</th>
							<th scope="col" style={{ width: "20%" }}>
								Proposed Action
							</th>
							<th scope="col" style={{ width: "20%" }}>
								Expect Result
							</th>
							<th scope="col" style={{ width: "15%" }}>
								Project Status
							</th>
						</tr>
					</thead>
					<tbody>
						{!table ? (
							<tr>
								<td colSpan="5">
									<h3 className="text-center">--No projects to display--</h3>
								</td>
							</tr>
						) : (
							projects.map((proj, idx) => {
								return (
									<tr key={idx}>
										<th scope="row">{idx + 1}</th>
										<td>{proj.project_name}</td>
										<td>{proj.problem_statement}</td>
										<td>{proj.proposed_action}</td>
										<td>{proj.expected_result}</td>
										<td>{proj.project_status}</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ProjectTable;
