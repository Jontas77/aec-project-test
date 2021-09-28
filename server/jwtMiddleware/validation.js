/* eslint-disable no-useless-escape */
module.exports = function (req, res, next) {
	const {
		student_name,
		student_email,
		student_password,
		mentor_name,
		mentor_email,
		mentor_password,
		admin_name,
		admin_email,
		admin_password,
	} = req.body;

	function validEmail(userEmail) {
		let domain = "@sun.ac.za";
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (regex.test(userEmail) && userEmail.includes(domain)) {
			return true;
		}
	}

	if (req.path === "/student/sign-up") {
		if (![student_name, student_email, student_password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(student_email)) {
			return res.status(401).json("Invalid Email");
		}
	} else if (req.path === "/student/login") {
		if (![student_email, student_password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(student_email)) {
			return res.status(401).json("Invalid Email");
		}
	}

	if (req.path === "/mentor/sign-up") {
		if (![mentor_email, mentor_name, mentor_password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(mentor_email)) {
			return res.status(401).json("Invalid Email");
		}
	} else if (req.path === "/mentor/login") {
		if (![mentor_email, mentor_password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(mentor_email)) {
			return res.status(401).json("Invalid Email");
		}
	}

	if (req.path === "/admin/sign-up") {
		if (![admin_email, admin_name, admin_password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(admin_email)) {
			return res.status(401).json("Invalid Email");
		}
	} else if (req.path === "/admin/login") {
		if (![admin_email, admin_password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(admin_email)) {
			return res.status(401).json("Invalid Email");
		}
	}
	next();
};