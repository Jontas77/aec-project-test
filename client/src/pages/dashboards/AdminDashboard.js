import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import ProposalTempl from "../proposals/ProposalTempl";
import AllProposals from "../proposals/Proposals";
import Competitions from "../proposals/Competitions";
import CompTemplate from "../proposals/CompTemplate";
import MentorSignUp from "../register/MentorSignUp";

const AdminDashboard = ({ setAuth }) => {

	const [proposals, setProposals] = useState([]);
	const [page, setPage] = useState("");

	const getProposals = async () => {
		try {
			const response = await axios.get("/api/project");
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
				<ProposalTempl setPage={setPage} />
			) : page === "compTemplate" ? (
					<CompTemplate setPage={setPage} />
					) :	page === "all" ?
					(<AllProposals page={page} setPage={setPage} proposals={proposals} />
					) : page === "competition" ?
						(<div>
							<Competitions page={page} setPage={setPage} />
							</div>
							) : page === "mentor" ? (
								<MentorSignUp setPage={setPage} />
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
									Projects
								</Button>
								<br />
								<br />
								<Button
									onClick={()=>setPage("proposal")}
									variant='contained'
								>
									Add project
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
								<Button
								onClick={() => setPage("compTemplate")}
								variant='contained'
								>
								Add competition
								</Button>
								<br />
								<br />
								<Button
								onClick={() => setPage("mentor")}
								variant='contained'
								>
								Add mentor
								</Button>
				</Container>
			)}
			</div>
	);
};

export default AdminDashboard;