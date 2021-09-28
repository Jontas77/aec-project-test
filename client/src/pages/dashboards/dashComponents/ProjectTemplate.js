import React from "react";

const ProjectTemplate = () => {
	return (
		<div>
			<form>
				<p>The Project</p>
				<input type="text" />
				<p>Problem statement</p>
				<input type="text" />
				<p>Proposed action</p>
				<input type="text" />
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default ProjectTemplate;
