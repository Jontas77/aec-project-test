import { Router } from "express";
import pool from './db.js'

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Welcome to Stellenbosch University" });
});

// ADD NEW PROJECT
router.post("/project", async (req, res) => {
	try {
		const { project_name, project_target_group, project_description } = req.body;
		const newProject = await pool.query('INSERT INTO projects (project_name, project_target_group, project_description) VALUES ($1,$2,$3) RETURNING *', [project_name, project_target_group, project_description]);
		res.json({ projects: newProject });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET ALL PROJECTS
router.get("/project", async (req, res) => {
	try {
		const projects = await pool.query('SELECT * FROM projects');
		res.json(projects.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
