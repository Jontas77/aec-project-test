import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step5 = ({ formData, setForm, navigation }) => {

	const { key_partners, stakeholders, networks } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 5</h3>
			<TextField
				label="Key Partners"
				name="key_partners"
				value={key_partners}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Stakeholders"
				name="stakeholders"
				value={stakeholders}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Networks"
				name="networks"
				value={networks}
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

export default Step5;
