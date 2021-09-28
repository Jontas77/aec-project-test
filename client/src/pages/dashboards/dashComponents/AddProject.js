import React from "react";

const AddProject = () => {
	return (
		<div>
			<form>
				<p>The Project</p>
				<input type="text" className="form-control" name="" value="" />
				<p>Problem statement</p>
				<input type="text" className="form-control" name="" value="" />
				<p>Proposed action</p>
				<input type="text" className="form-control" name="" value="" />
				<button type="submit" className="btn btn-primay btn-block" >Send</button>
			</form>
		</div>
	);
};

export default AddProject;
