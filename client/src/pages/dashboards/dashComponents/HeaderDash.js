import React from "react";
//import logo from "../../stellenbosch-university-logo.png";
import "../Dashboard.css";

const HeaderDash = ({ logout }) => {
	return (
		<header className="header-dashboard">
			<div className="logo">
				<img src="#" className="logo" alt="Stellies Logo" />
			</div>

			<div className="nav-links">
				<button className="btn logout-btn" onClick={(e) => logout(e)}>
					Logout
				</button>
			</div>
		</header>
	);
};

export default HeaderDash;
