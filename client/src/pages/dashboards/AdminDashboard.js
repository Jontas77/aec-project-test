import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import ProposalA from "../proposals/ProposalA";
import AllProposals from "../proposals/AllProposals";
import Competitions from "../proposals/Competitions";

const AdminDashboard = ({ setAuth }) => {

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
			{page === "proposal" ? (
				<ProposalA setPage={setPage} />
			) : page === "all" ?
					(<AllProposals page={page} setPage={setPage} proposals={proposals} />
					) : page === "competition" ?
						(<div>
							<Competitions page={page} setPage={setPage} proposals={proposals} />
							</div>
						) : (<Container style={{ width: "100%" }}>
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
									onClick={()=>setPage("proposal")}
									variant='contained'
								>
									Create proposal
								</Button>
								<br />
								<br />
								<Button
									onClick={()=>setPage("all")}
									variant='contained'
								>
									All  proposals
								</Button>
								<br />
								<br />
								<Button
									onClick={()=>setPage("competition")}
									variant='contained'
								>
									Create competition
								</Button>
				</Container>
			)}
			</div>
	);
};

export default AdminDashboard;