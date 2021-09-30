import { Router } from "express";
import pool from './db.js'

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Welcome to Stellenbosch University" });
});

// ADD NEW PROJECT
router.post("/project", async (req, res) => {
	try {
		const { project_name, problem_statement, proposed_action, expected_result } = req.body;
		const newProposal = await pool.query('INSERT INTO projects (project_name, problem_statement, proposed_action, expected_result) VALUES ($1,$2,$3,$4) RETURNING *', [project_name, problem_statement, proposed_action, expected_result]);
		res.json({ projects: newProposal });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL PROJECT
router.get("/project", async (req, res) => {
	try {
		const projects = await pool.query('SELECT * FROM projects');
		res.json(projects.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// ADD NEW COMPETITION
router.post("/competition", async (req, res) => {
	try {
		const { comp_title, comp_desc, contact_pers } = req.body;
		const newCompetition = await pool.query('INSERT INTO competitions (comp_title, comp_desc, contact_pers) VALUES ($1,$2,$3) RETURNING *', [comp_title, comp_desc, contact_pers]);
		res.json({ competitions: newCompetition });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL COMPETITIONS
router.get("/competition", async (req, res) => {
	try {
		const competitions = await pool.query('SELECT * FROM competitions');
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
		const theTeam = await pool.query(
			"SELECT * FROM team"
		);
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
		res.status(500).json({ message: "Couldn't fetch the testimonials at the moment" });
	}
});

export default router;
