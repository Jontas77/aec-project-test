/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
//import HeaderDash from "./dashComponents/HeaderDash";
import { toast } from "react-toastify";
import "./Dashboard.css";

import Profile from "./dashComponents/Profile";
import AccountSettings from "./dashComponents/AccountSettings";
import EditProfile from "./dashComponents/EditProfile";
import Projects from "./dashComponents/Projects";
import Competitions from "./dashComponents/Compititions";



const StudentDashboard = (props) => {
	//const [name, setName] = useState("");
	// const [message, setMessage] = useState("--No Feedback to Display--");
	const [page, setPage] = useState("");
	const [profileInfo, setProfileInfo] = useState({});
	const [basicInfo, setBasicInfo] = useState({});

	const getName = async () => {
		try {
			const response = await fetch("/auth/student/dashboard", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			//setName(parseRes[0].student_name);
			setBasicInfo(parseRes[0]);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getName();
		//props.changeNotifications(7);
	}, []);

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		props.setAuth(false);

		toast.success("Logged out successfully!");
	};

	return (
		<>
			{/*<HeaderDash logout={logout} />*/}
			<div className="container container-fluid no-padding">
				{page === "profile" ? (
					<Profile
						setPage={setPage}
						setProfileInfo={setProfileInfo}
						profileInfo={profileInfo}
						basicInfo={basicInfo}
					/>
				) : page === "edit_profile" ? (
					<EditProfile
						setPage={setPage}
						setProfileInfo={setProfileInfo}
						profileInfo={profileInfo}
					/>
				) : page === "account_settings" ? (
					<AccountSettings setPage={setPage} />
				) : page === "projects" ? (
					<Projects setPage={setPage} />
				) : page === "competitions" ? (
					<Competitions setPage={setPage} />
				) : (
					<>
						<div className="introduction">
							<h1>Student Dashboard</h1>
							<h2>Welcome Back {basicInfo?.student_name}</h2>
						</div>
						<div className="display">--No Feedback to Display--</div>
						<div className="links-wrapper">
							<div className="links">
								<div className="profile" onClick={() => setPage("profile")}>
									<i className="fas fa-user"></i>Profile
								</div>
								<div className="projects" onClick={() => setPage("projects")}>
									<i className="fas fa-project-diagram"></i>Projects
								</div>
								<div
									className="competitions"
									onClick={() => setPage("competitions")}
								>
									<i className="fas fa-trophy"></i>Competitions
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default StudentDashboard;
