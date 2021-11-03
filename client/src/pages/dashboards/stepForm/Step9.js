import React from "react";
import { Container, TextField, Button } from "@mui/material";

const Step9 = ({ formData, setForm, navigation }) => {

	const { who_we_are, vision_and_mission, track_record } = formData;

	return (
		<Container maxWidth="md">
			<h3>Step 9</h3>
			<TextField
				label="Who We Are"
				name="who_we_are"
				value={who_we_are}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Vision And Mission"
				name="vision_and_mission"
				value={vision_and_mission}
				margin="normal"
				variant="outlined"
				autoComplete="off"
				multiline
				rows={4}
				fullWidth
				onChange={setForm}
			/>
			<TextField
				label="Track Record"
				name="track_record"
				value={track_record}
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

export default Step9;
