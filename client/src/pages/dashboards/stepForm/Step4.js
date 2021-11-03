import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step4 = ({ formData, setForm, navigation }) => {
	const { client_profile, client_relationships, client_channels } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 4</h3>
			<TextField
				label="Client Profile"
				name="client_profile"
				value={client_profile}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Client Relationships"
				name="client_relationships"
				value={client_relationships}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Client Channels"
				name="client_channels"
				value={client_channels}
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

export default Step4;
