import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import StudentSignUp from "./pages/register/StudentSignUp";
import StudentLogin from "./pages/login/StudentLogin";
import MentorLogin from "./pages/login/MentorLogin";
import AdminLogin from "./pages/login/AdminLogin";

import StudentDashboard from "./pages/dashboards/StudentDashboard";
import MentorDashboard from "./pages/dashboards/MentorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import { toast } from "react-toastify";

import { elapsedTimeStr } from "./components/services/utils";
import LogIn from "./pages/login/LogIn";
import Header from "./components/Header";
import HEADERS_DATA from "./assets/data/headers_data";

toast.configure();

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	const [user, setUser] = useState({
    auth: false,
    role: "",
    user_id: "",
    last_login: "",
  });

  const changeUser = (currentUser) => {
		setUser(currentUser);
	};

	const [notifications, setNotifications] = useState(0);
	const [headers, setHeaders] = useState(HEADERS_DATA.home);

	const changeNotifications = (count) => {
		setNotifications(count);
	};

	const changeHeaders = (currentHeaders) => {
		setHeaders(currentHeaders);
	};

	useEffect(() => {
		let localUserData = localStorage.getItem("user");
		if (localUserData) {
			let userProfile = JSON.parse(localUserData);
			const minutes = elapsedTimeStr(userProfile.last_login, false);
			if (minutes > 720) {
				changeUser({
					auth: false,
					role: "",
					user_id: "",
					last_login: "",
				});
				localStorage.removeItem("user");
			} else {
				changeUser(userProfile);
			}
		}
		//user.auth ? changeHeaders(HEADERS_DATA[user.role]) : changeHeaders(HEADERS_DATA.home);
	}, []);

	return (
		<>
			<Router>
				<Header
					user={user}
					changeUser={changeUser}
					notifications={notifications}
					changeNotifications={changeNotifications}
					headers={headers}
				/>
				<Switch>
					<Route exact path="/" render={(props) => <Home {...props} />} />
					<Route
						exact
						path="/student/sign-up"
						render={(props) =>
							!isAuthenticated ? (
								<StudentSignUp {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/student/login" />
							)
						}
					/>
					<Route
						exact
						path="/student/login"
						render={(props) =>
							!isAuthenticated ? (
								<StudentLogin {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/student/dashboard" />
							)
						}
					/>
					<Route
						path="/login"
						render={(props) => (
							<LogIn
								{...props}
								user={user}
								changeUser={changeUser}
								changeHeaders={changeHeaders}
							/>
						)}
					/>
					<Route
						exact
						path="/mentor/login"
						render={(props) =>
							!isAuthenticated ? (
								<MentorLogin {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/mentor/dashboard" />
							)
						}
					/>
					<Route
						exact
						path="/admin/login"
						render={(props) =>
							!isAuthenticated ? (
								<AdminLogin {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/admin/dashboard" />
							)
						}
					/>
					<Route
						exact
						path="/student/dashboard"
						render={(props) =>
							user.auth ? (
								<StudentDashboard
									{...props}
									user={user}
									setAuth={setAuth}
									changeHeaders={changeHeaders}
									changeNotifications={changeNotifications}
								/>
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						exact
						path="/mentor/dashboard"
						render={(props) =>
							isAuthenticated ? (
								<MentorDashboard {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/mentor/login" />
							)
						}
					/>
					<Route
						exact
						path="/admin/dashboard"
						render={(props) =>
							isAuthenticated ? (
								<AdminDashboard {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/admin/login" />
							)
						}
					/>
					<Route path="/*" render={(props) => <Home {...props} />} />
				</Switch>
			</Router>
		</>
	);
};

export default App;
