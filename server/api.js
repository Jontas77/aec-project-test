import { Router } from "express";
import pool from "./db.js";
import authorization from "./jwtMiddleware/authorization";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Welcome to Stellenbosch University" });
});

// ADD NEW PROJECT
router.post("/project", async (req, res) => {
	try {
		const {
			project_name,
			problem_statement,
			proposed_action,
			expected_result,
		} = req.body;
		const newProject = await pool.query(
			"INSERT INTO projects (project_name, problem_statement, proposed_action, expected_result) VALUES ($1,$2,$3,$4) RETURNING *",
			[project_name, problem_statement, proposed_action, expected_result]
		);
		res.json({ projects: newProject });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL PROJECT
router.get("/project", async (req, res) => {
	try {
		const projects = await pool.query("SELECT * FROM projects");
		res.json(projects.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// CREATE NEW PROJECT PROPOSAL STEP 1
router.post("/student/projects", authorization, async (req, res) => {
	const {
		project_name,
		problem_statement,
		proposed_action,
		expected_result,
		project_status = "await feedback",
	} = req.body;
	try {
		await pool.query(
			"INSERT INTO projects (student_id, project_name, problem_statement, proposed_action, expected_result, project_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[
				req.user,
				project_name,
				problem_statement,
				proposed_action,
				expected_result,
				project_status,
			]
		);
		res.json({ status: "success", message: "Project proposal added!" });
	} catch (error) {
		console.error(error.message);
	}
});

// GET PROJECT PROPOSAL
router.get("/student/projects", authorization, async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT project_name, problem_statement, proposed_action, expected_result, project_status FROM projects"
		);
		res.json(result.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// SEND FEEDBACK ON PROJECT
router.post("/mentor/feedback/:projectId", authorization, async (req, res) => {
	try {
		const { projectId } = req.params;
		const { feedback } = req.body;
		console.log(req.user.student_id);
		const getProject = await pool.query(
			"SELECT * FROM projects WHERE project_id = $1",
			[projectId]
		);

		if (getProject) {
			const giveFeedback = await pool.query(
				"INSERT INTO feedback (student_id, project_id, feedback) VALUES ($1, $2, $3) RETURNING *",
				[req.user, projectId, feedback]
			);

			res.json(giveFeedback.rows);
		}
	} catch (error) {
		console.error(error.message);
	}
});

// GET FEEDBACK FROM MENTOR
router.get("/mentor/feedback", authorization, async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT students.student_name, feedback.project_id, feedback.feedback FROM students LEFT JOIN feedback ON students.student_id = feedback.student_id WHERE students.student_id = $1",
			[req.user]
		);
		res.json(result.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// ADD NEW COMPETITION
router.post("/competition", async (req, res) => {
	try {
		const { comp_title, comp_desc, contact_pers } = req.body;
		const newCompetition = await pool.query(
			"INSERT INTO competitions (comp_title, comp_desc, contact_pers) VALUES ($1,$2,$3) RETURNING *",
			[comp_title, comp_desc, contact_pers]
		);
		res.json({ competitions: newCompetition });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL COMPETITIONS
router.get("/competition", async (req, res) => {
	try {
		const competitions = await pool.query("SELECT * FROM competitions");
		res.json(competitions.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/featured_projects", async (req, res) => {
	try {
		const allProjects = await pool.query(
			"SELECT * FROM featured_projects LIMIT 12"
		);
		res.status(200).json(allProjects.rows);
	} catch (error) {
		res.status(500).json({ message: "Couldn't fetch projects at the moment" });
	}
});

router.get("/meet_the_team", async (req, res) => {
	try {
		const theTeam = await pool.query("SELECT * FROM team");
		res.status(200).json(theTeam.rows);
	} catch (error) {
		res.status(500).json({ message: "Couldn't fetch the team at the moment" });
	}
});

router.get("/testimonials", async (req, res) => {
	try {
		const testimonials = await pool.query("SELECT * FROM testimonials");
		res.status(200).json(testimonials.rows);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Couldn't fetch the testimonials at the moment" });
	}
});

router.get("/students_profile/:student_id", async (req, res) => {
	const { student_id } = req.params;
	try {
		const profile = await pool.query(
			"SELECT * FROM students_profile WHERE student_id = $1",
			[student_id]
		);
		if (profile.rowCount > 0) {
			res.status(200).json(profile.rows[0]);
		} else {
			res.status(404).json({
				message: "No information found for the student",
				body: profile,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Couldn't fetch the student profile at the moment",
			error: error,
		});
	}
});

router.post("/students_profile", async (req, res) => {
	const {
		student_id,
		student_number,
		student_phone,
		student_bio,
		student_img,
		student_active,
	} = req.body;
	try {
		await pool.query(
			"INSERT INTO students_profile (student_id, student_number, student_phone, student_bio, student_img, student_active) VALUES ($1, $2, $3, $4, $5, $6)",
			[
				student_id,
				student_number,
				student_phone,
				student_bio,
				student_img,
				student_active,
			]
		);

		res.status(200).json({ message: "Ok" });
	} catch (error) {
		res.status(500).json({
			message: "Couldn't post the student profile at the moment",
			error: error,
		});
	}
});

router.put("/students_profile", async (req, res) => {
	const {
		student_id,
		student_number,
		student_phone,
		student_bio,
		student_img,
		student_active,
	} = req.body;
	console.log(req.body);
	try {
		await pool.query(
			"UPDATE students_profile SET student_number = $1, student_phone = $2, student_bio = $3, student_img = $4, student_active = $5 WHERE student_id = $6",
			[
				student_number,
				student_phone,
				student_bio,
				student_img,
				student_active,
				student_id,
			]
		);

		res.status(200).json({ message: "Ok" });
	} catch (error) {
		res.status(500).json({
			message: "Couldn't update the student profile at the moment",
			error: error,
		});
	}
});

export default router;
