import React, { useState } from "react";
import ProjectTemplate from "../ProjectTemplate";

const AdminDashboard = ({ setAuth }) => {
	const [template, setTemplate] = useState(false);

	const handleClick = () => {
		setTemplate(true);
	};

	return (
		<>
			{template === true ? (
				<ProjectTemplate />
			) : (
				<div>
					<h1>WELCOME ADMIN</h1>
					<h2>DASHBOARD</h2>
					<button onClick={() => setAuth(false)}>Log out</button>

					<button className="btn btn-primary" onClick={handleClick}>
						Create Template
					</button>
				</div>
			)}
		</>
	);
};

export default AdminDashboard;
