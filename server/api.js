import { Router } from "express";
import authorization from "./jwtMiddleware/authorization";
import pool from "./db";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Welcome to Stellenbosch University" });
});

// Projects routes
router.post("/student/projects", authorization, async (req, res) => {
	const { project_name, project_desc } = req.body;
	try {
		const newProject = await pool.query(
			"INSERT INTO projects (student_id, project_name, project_desc) VALUES ($1, $2, $3) RETURNING *",
			[req.user, project_name, project_desc]
		);
		res.json(newProject.rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get("/student/projects", authorization, async (req, res) => {
	try {
		const results = await pool.query(
			"SELECT projects.project_name, projects.project_desc FROM students LEFT JOIN projects ON students.student_id = projects.student_id WHERE students.student_id = $1",
			[req.user]
		);
		res.json(results.rows);
	} catch (error) {
		console.error(error.message);
	}
});

//Profile routes
router.post("/student/profile", authorization, async (req, res) => {
	const { name, email, phone, bio, profile_pic } = req.body;
	console.log(req.user, name, email, phone, bio, profile_pic);
	try {
		const result = await pool.query(
			"INSERT INTO profile (student_id, name, email, phone, bio, profile_pic) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[req.user, name, email, phone, bio, profile_pic]
		);
		res.json(result.rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get("/student/competitions", authorization, async (req, res) => {
	try {
		const results = await pool.query("SELECT * FROM competitions");
		res.json(results.rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get("/student/signup", async (req, res) => {
	/*const {
		first_name,
		last_name,
		gender,
		stud_num,
		email,
		phone,
		state,
		bio,
		img,
		password,
		active,
	} = req.body;
	console.log(first_name, last_name, gender, stud_num);
	try {
		const result = await pool.query(
			"INSERT INTO students (first_name, last_name, gender, stud_num, email, phone, state, bio, img, password, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
			[
				first_name,
				last_name,
				gender,
				stud_num,
				email,
				phone,
				state,
				bio,
				img,
				password,
				active,
			]
		);
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).send({ message: "Server error" });
	}*/
	res.status(200).json("Hit");
});

export default router;
