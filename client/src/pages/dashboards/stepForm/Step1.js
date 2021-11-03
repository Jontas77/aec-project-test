/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Container, TextField, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Step1 = ({ formData, setForm, navigation, setPage }) => {
	const { project_name, problem_statement, proposed_action } = formData;

	return (
		<Container maxWidth="md">
			<div
				className="back"
				onClick={() => setPage("")}
				style={{ fontWeight: "600", cursor: "pointer" }}
			>
				<ArrowBackIcon />
				Go Back
			</div>
			<div className="text-center mb-3"><h2>Add New Proposal</h2></div>
			<h3>Step 1</h3>
			<TextField
				label="The Project"
				name="project_name"
				value={project_name}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Problem Statement"
				name="problem_statement"
				value={problem_statement}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Proposed Action"
				name="proposed_action"
				value={proposed_action}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<Button
				variant="contained"
				fullWidth
				style={{ marginTop: "1rem", backgroundColor: "#551b33", color: "#fff" }}
				onClick={() => navigation.next()}
			>
				Next
			</Button>
		</Container>
	);
};

export default Step1;
