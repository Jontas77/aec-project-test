import { Router } from "express";
import pool from './db.js'

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Welcome to Stellenbosch University" });
});

// ADD NEW PROPOSAL
router.post("/proposal", async (req, res) => {
	try {
		const { proposal_name, problem_statemnt, proposed_action, expected_result } = req.body;
		const newProposal = await pool.query('INSERT INTO proposals (proposal_name, problem_statemnt, proposed_action, expected_result) VALUES ($1,$2,$3,$4) RETURNING *', [proposal_name, problem_statemnt, proposed_action, expected_result]);
		res.json({ proposal: newProposal });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL PROPOSALS
router.get("/proposal", async (req, res) => {
	try {
		const proposals = await pool.query('SELECT * FROM proposals');
		res.json(proposals.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// ADD NEW COMPETITION
router.post("/competition", async (req, res) => {
	try {
		const { comp_desc, contact_pers } = req.body;
		const newCompetition = await pool.query('INSERT INTO competitions (comp_desc, contact_pers) VALUES ($1,$2) RETURNING *', [comp_desc, contact_pers]);
		res.json({ proposal: newCompetition });
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

export default router;
