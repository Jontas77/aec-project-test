import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step3 = ({ formData, setForm, navigation }) => {

	const { key_activities, key_resources, team } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 3</h3>
			<TextField
				label="Key Activities"
				name="key_activities"
				value={key_activities}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Key Resources"
				name="key_resources"
				value={key_resources}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Team"
				name="team"
				value={team}
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

export default Step3;
