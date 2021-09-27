/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

const Profile = ({ setPage }) => {
	return (
		<div>
			<h1>Profile Page</h1>
			<div className="back">
				<i className="fas fa-arrow-left" onClick={() => setPage("")}>
					{"  "}Go Back
				</i>
			</div>
		</div>
	);
};

export default Profile;
