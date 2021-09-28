import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import AllNotifications from "./pages/dashboard/AllNotifications";
import Profile from "./pages/dashboard/Profile";
import EditProfile from "./pages/dashboard/EditProfile";
import HEADERS_DATA from "./components/headers_data";
import Settings from "./pages/dashboard/Settings";
import { elapsedTimeStr } from "./services/utils";
import CreateProject from "./pages/dashboard/CreateProject";
import ViewProject from "./pages/dashboard/ViewProject";
import MyProjects from "./pages/dashboard/MyProjects";

import StudentSignUp from "./pages/register/StudentSignUp";
import StudentLogin from "./pages/login/StudentLogin";
import MentorLogin from "./pages/login/MentorLogin";
import AdminLogin from "./pages/login/AdminLogin";

import StudentDashboard from "./pages/dashboards/StudentDashboard";
import MentorDashboard from "./pages/dashboards/MentorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import { toast } from "react-toastify";

toast.configure();

const App = (props) => {
	const [user, setUser] = useState({
    auth: false,
    role: "",
    user_id: "",
    user_name: "",
    last_login: "",
  });

	const changeUser = (currentUser) => {
		setUser(currentUser);
	};

	const [notifications, setNotifications] = useState(0);
	const [headers, setHeaders] = useState(HEADERS_DATA.home);

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
					user_name: "",
					last_login: "",
				});
				localStorage.removeItem("user");
			} else {
				changeUser(userProfile);
			}
		}
	}, []);

	const changeNotifications = (count) => {
		setNotifications(count);
	};

	const changeHeaders = (currentHeaders) => {
		setHeaders(currentHeaders);
	};

	return (
		<>
			<Router>
				<Header
					user={user}
					changeUser={changeUser}
					notifications={notifications}
					changeNotifications={changeNotifications}
					headers={headers}
					changeHeaders={changeHeaders}
				/>
				<Switch>
					<Route exact path="/" render={(props) => <Home {...props} />} />
					<Route
						exact
						path="/sign-up"
						render={(props) =>
							!user.auth ? (
								<SignUp
									{...props}
									user={user}
									changeUser={changeUser}
									changeHeaders={changeHeaders}
								/>
							) : (
								<Redirect to="/student/login" />
							)
						}
					/>
					<Route
						path="/login"
						render={(props) => (
							<LogIn {...props} user={user} changeUser={changeUser} />
						)}
					/>
					<Route
						exact
						path="/mentor/login"
						render={(props) =>
							!user.auth ? (
								<MentorLogin {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/mentor/dashboard" />
							)
						}
					/>
					<Route
						path="/dashboard"
						render={(props) =>
							user.auth ? (
								<Dashboard
									{...props}
									user={user}
									changeNotifications={changeNotifications}
									changeHeaders={changeHeaders}
								/>
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						path="/allnotifications"
						render={(props) =>
							user.auth ? (
								<AllNotifications {...props} user={user} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						path="/createproject"
						render={(props) =>
							user.auth ? (
								<CreateProject {...props} user={user} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						path="/myprojects"
						render={(props) =>
							user.auth ? (
								<MyProjects {...props} user={user} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						path="/viewproject"
						render={(props) =>
							user.auth ? (
								<ViewProject {...props} user={user} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						path="/myprofile"
						render={(props) =>
							user.auth ? (
								<Profile {...props} user={user} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						path="/accountsettings"
						render={(props) =>
							user.auth ? (
								<Settings {...props} user={user} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						path="/editprofile"
						render={(props) =>
							user.auth ? (
								<EditProfile {...props} user={user} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						exact
						path="/admin/login"
						render={(props) =>
							!user.auth ? (
								<AdminLogin {...props} />
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
								<StudentDashboard {...props} />
							) : (
								<Redirect to="/student/login" />
							)
						}
					/>
					<Route
						exact
						path="/mentor/dashboard"
						render={(props) =>
							user.auth ? (
								<MentorDashboard {...props} />
							) : (
								<Redirect to="/mentor/login" />
							)
						}
					/>
					<Route
						exact
						path="/admin/dashboard"
						render={(props) =>
							user.auth ? (
								<AdminDashboard {...props} />
							) : (
								<Redirect to="/admin/login" />
							)
						}
					/>
					<Route
						path="/*"
						render={(props) => (
							<Home
								{...props}
								changeUser={changeUser}
								changeNotifications={changeNotifications}
								changeHeaders={changeHeaders}
							/>
						)}
					/>
				</Switch>
			</Router>
		</>
	);
};

export default App;
