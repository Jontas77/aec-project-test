/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import Topbar from "./MentorDashboard/topbar/Topbar";
import Sidebar from "./MentorDashboard/sidebar/Sidebar";
import "./MentorDashboard/topbar/Topbar.css";
import "./MentorDashboard/App.css";
import "./MentorDashboard/sidebar/Sidebar.css";
import { toast } from "react-toastify";
import Profile from "./dashComponents/Profile";
import Projects from "./dashComponents/Projects";
import Competitions from "./dashComponents/Compititions";
import { Pages } from "@mui/icons-material";



const MentorDashboard = (props) => {
	const [name, setName] = useState("");
	const getName = async () => {
		try {
			// const response = await fetch("/auth/mentor/dashboard", {
			// 	method: "GET",
			// 	headers: { token: localStorage.token },
			// });
			const response = await fetch("/auth/student/dashboard", {
				method: "GET",
				headers: { token: props.user.user_id },
			});

			const parseRes = await response.json();

			setName(parseRes[0].mentor_name);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getName();
	}, []);

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		props.setAuth(false);

		toast.success("You Logged out successfully!");
	};

	return (
		<><div className="introduction">

			<h2>Welcome Back {name}</h2>
		</div><div>
				<Profile />
				<Competitions />
				<Projects />
				<Topbar Logout={logout} />
				<Sidebar />
				{/* <button onClick={() => setAuth(false)}>Log Out</button> */}
			</div></>
	);

};

export default MentorDashboard;
