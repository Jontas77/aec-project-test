/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import "./Dashboard.css";

import Profile from "./dashComponents/Profile";
import AccountSettings from "./dashComponents/AccountSettings";
import EditProfile from "./dashComponents/EditProfile";
import Projects from "./dashComponents/Projects";
import Competitions from "./dashComponents/Compititions";
import ProjectTable from "./dashComponents/ProjectTable";
import AddProposal from "./dashComponents/AddProposal";

import PersonIcon from "@mui/icons-material/Person";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import Upload from "./Upload";



const StudentDashboard = () => {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [info, setInfo] = useState("");
	const [page, setPage] = useState("");

	const getName = async () => {
		try {
			const response = await fetch("/auth/student/dashboard", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			setName(parseRes[0].student_name);
			setId(parseRes[0].student_id);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getName();
		let localUserData = localStorage.getItem("profile");
		if (localUserData) {
			let userProfile = JSON.parse(localUserData);
			for (let name in userProfile) {
				setInfo((info) => {
					return ({
						...info,
						[name]: userProfile[name],
					});
				});
			}
		}
	}, []);

	return (
		<>
			<div className="container container-fluid no-padding">
				{page === "profile" ? (
					<Profile
						setPage={setPage}
						id={id}
						setInfo={setInfo}
					/>
				) : page === "edit_profile" ? (
					<EditProfile
						setPage={setPage}
						id={id}
						info={info}
					/>
				) : page === "account_settings" ? (
					<AccountSettings setPage={setPage} />
				) : page === "projects" ? (
					<Projects setPage={setPage} />
				) : page === "competitions" ? (
					<Competitions setPage={setPage} />
				) : page === "proposal" ? (
					<AddProposal setPage={setPage} />
				) : (
					<>
						<div className="introduction">
							<h1>Student Dashboard</h1>
							<h2>Welcome Back {name}</h2>
						</div>
						<div className="links-wrapper">
							<div className="links">
								<div className="profile" onClick={() => setPage("profile")}>
									<PersonIcon style={{ fontSize: "2rem" }} />Profile
								</div>
								<div className="projects" onClick={() => setPage("proposal")}>
									<VolunteerActivismIcon style={{ fontSize: "2rem" }} /> Add Project
								</div>
								<div
									className="competitions"
									onClick={() => setPage("competitions")}
								>
									<SportsKabaddiIcon style={{ fontSize: "2rem" }} />Competitions
								</div>
							</div>
						</div>
						<hr />
						<ProjectTable />
						<Upload />
					</>
				)}
			</div>
		</>
	);
};

export default StudentDashboard;
