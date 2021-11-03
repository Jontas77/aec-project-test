import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step6 = ({ formData, setForm, navigation }) => {

	const { startup_costs, operational_costs } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 6</h3>
			<TextField
				label="Startup Costs"
				name="startup_costs"
				value={startup_costs}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Operational Costs"
				name="operational_costs"
				value={operational_costs}
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

export default Step6;
