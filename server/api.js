import { Router } from "express";
import pool from "./db.js";
import authorization from "./jwtMiddleware/authorization";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Welcome to Stellenbosch University" });
});

// ADD NEW PROPOSAL
router.post("/proposal", async (req, res) => {
	try {
		const {
			proposal_name,
			problem_statemnt,
			proposed_action,
			expected_result,
		} = req.body;
		const newProposal = await pool.query(
			"INSERT INTO proposals (proposal_name, problem_statemnt, proposed_action, expected_result) VALUES ($1,$2,$3,$4) RETURNING *",
			[proposal_name, problem_statemnt, proposed_action, expected_result]
		);
		res.json({ proposal: newProposal });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL PROPOSALS
router.get("/proposal", async (req, res) => {
	try {
		const proposals = await pool.query("SELECT * FROM proposals");
		res.json(proposals.rows);
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
		const { comp_desc, contact_pers } = req.body;
		const newCompetition = await pool.query(
			"INSERT INTO competitions (comp_desc, contact_pers) VALUES ($1,$2) RETURNING *",
			[comp_desc, contact_pers]
		);
		res.json({ proposal: newCompetition });
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

export default router;
