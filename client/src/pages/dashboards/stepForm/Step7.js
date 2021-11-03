import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step7 = ({ formData, setForm, navigation }) => {

	const { finance_plan, business_plan } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 7</h3>
			<TextField
				label="Finance Plan"
				name="finance_plan"
				value={finance_plan}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Business Plan"
				name="business_plan"
				value={business_plan}
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

export default Step7;
