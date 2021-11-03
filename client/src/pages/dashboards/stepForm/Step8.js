import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step8 = ({ formData, setForm, navigation }) => {

	const { implementation_plan, key_milestones, monitoring_and_evaluation } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 8</h3>
			<TextField
				label="Implementation Plan"
				name="implementation_plan"
				value={implementation_plan}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Key Milestones"
				name="key_milestones"
				value={key_milestones}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Monitoring And Evaluation"
				name="monitoring_and_evaluation"
				value={monitoring_and_evaluation}
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
				color="secondary"
				style={{ marginTop: "1rem" }}
				onClick={() => navigation.previous()}
			>
				Back
			</Button>
			<Button
				variant="contained"
				style={{
					marginTop: "1rem",
					marginLeft: "1rem",
					backgroundColor: "#551b33",
					color: "#fff",
				}}
				onClick={() => navigation.next()}
			>
				Next
			</Button>
		</Container>
	);
};

export default Step8;
