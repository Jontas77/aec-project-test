import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step2 = ({ formData, setForm, navigation }) => {

	const { expected_result, social_returns } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 2</h3>
			<TextField
				label="Expected Result"
				name="expected_result"
				value={expected_result}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Social Returns"
				name="social_returns"
				value={social_returns}
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
				style={{ marginTop: "1rem", marginLeft: "1rem", backgroundColor: "#551b33", color: "#fff" }}
				onClick={() => navigation.next()}
			>
				Next
			</Button>
		</Container>
	);
};

export default Step2;
