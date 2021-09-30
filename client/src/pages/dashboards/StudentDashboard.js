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
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [info, setInfo] = useState("");
	// const [message, setMessage] = useState("--No Feedback to Display--");
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
		//props.changeNotifications(7);
		let localUserData = localStorage.getItem("profile");
		//alert(localUserData);
		if (localUserData) {
			let userProfile = JSON.parse(localUserData);
			for (let name in userProfile) {
				console.log(`${name}: ${userProfile[name]}, `);
				setInfo({
					...info,
					[name]: userProfile[name],
				});
			}
		}
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
				) : (
					<>
						<div className="introduction">
							<h1>Student Dashboard</h1>
							<h2>Welcome Back {name}</h2>
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
