import React from "react";
import { Container, Button } from "@mui/material";

const Submit = ({ setPage }) => {

	return (
		<Container maxWidth="md">
			<h3 className="mb-3">Thank you for submitting. A mentor will be in touch</h3>
			<Button onClick={() => setPage("")}>Dashboard</Button>
		</Container>
	);
};

export default Submit;
