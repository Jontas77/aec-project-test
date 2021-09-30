import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import AllProposals from "../proposals/Proposals";
import Competitions from "../proposals/Competitions";

const MentorDashboard = ({ setAuth }) => {

	const [proposals, setProposals] = useState([]);
	const [page, setPage] = useState("");

	const getProposals = async () => {
		try {
			const response = await axios.get("/api/proposal");
			const data = response.data;
			console.log(data);
			setProposals(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getProposals();
	}, [page]);
	

	return (
		<div>
			{page === "all" ?
				(<AllProposals page={page} setPage={setPage} proposals={proposals} />
				) : page === "competition" ?
					(<div>
						<Competitions page={page} setPage={setPage} />
					</div>
					) :
						(<Container style={{ width: "100%" }}>
							{/* HEADING START*/}
							<Typography variant="h5" component="h2">
								Welcome back admin@sun.ac.za
							</Typography>
							{/* HEADING END */}
							<br />
							<br />
							<Button
								onClick={() => setAuth(false)}
								variant='contained'
							>
								Log out
							</Button>
							<br />
							<br />
							<Button
								onClick={() => setPage("all")}
								variant='contained'
							>
								Proposals
							</Button>
							<br />
							<br />						
							<Button
								onClick={() => setPage("competition")}
								variant='contained'
							>
								Competitions
							</Button>
							<br />
							<br />
						</Container>
						)}
		</div>
	);
};

export default MentorDashboard;