import { Router } from "express";
import pool from "./db.js";
import authorization from "./jwtMiddleware/authorization";
import { imageUpload } from "./middleware.js";
import path from "path";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Welcome to Stellenbosch University" });
});

// IMAGE UPLOAD ROUTES
router.post("/image", imageUpload.single("image"), authorization, async (req, res) => {
	try {
		const { filename, mimetype, size } = req.file;
		const filepath = req.file.path;
		await pool.query(
			"INSERT INTO image_files(filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4) RETURNING *",
			[filename, filepath, mimetype, size]
		);
		res.json({ success: true, filename });
	} catch (error) {
		res.json({
			success: false,
			message: "Upload Falied",
			stack: error.stack,
		});
	}
});

router.get("/image/:filename", authorization, async (req, res) => {
	try {
		const { filename } = req.params;

		const imageFile = await pool.query(
			"SELECT * FROM image_files WHERE filename = $1",
			[filename]
		);

		if (imageFile.rows[0]) {
			const dirname = path.resolve();
			const fullfilepath = path.join(dirname, imageFile.rows[0].filepath);
			res.type(imageFile.rows[0].mimetype).sendFile(fullfilepath);
		} else {
			res.json("Image does not exists!!");
		}
	} catch (error) {
		res.status(404).json({
			success: false,
			message: "Not Found",
			stack: error.stack,
		});
	}
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
		const profile = await pool.query(
			"SELECT * FROM students_profile WHERE student_id = $1",
			[student_id]
		);
		if (profile.rowCount > 0) {
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
		} else {
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
		}
	} catch (error) {
		res.status(500).json({
			message: "Couldn't fetch the student profile at the moment",
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
