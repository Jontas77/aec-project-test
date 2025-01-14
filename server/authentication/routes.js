import { Router } from "express";
import studentAuth from "./students/studentAuth";
import mentorAuth from "./mentors/mentorAuth";
import adminAuth from "./admin/adminAuth";
import validation from "../jwtMiddleware/validation";
import authorization from "../jwtMiddleware/authorization";

const router = Router();

// Student register, Login, verify and dashboard routes
router.post("/student/sign-up", validation, studentAuth.SignUpStudent);
router.post("/student/login", validation, studentAuth.loginStudent);
router.get("/student/is-verify", authorization, studentAuth.verifyStudent);
router.get("/student/dashboard", authorization, studentAuth.getStudentDashboard);

// Mentor register, Login, verify and dashboard routes
router.post("/mentor/sign-up", validation, mentorAuth.SignUpMentor);
router.post("/mentor/login", validation, mentorAuth.loginMentor);
router.get("/mentor/is-verify", authorization, mentorAuth.verifyMentor);
router.get("/mentor/dashboard", authorization, mentorAuth.getMentorDashboard);

// Admin register, Login, verify and dashboard routes
router.post("/admin/sign-up", validation, adminAuth.SignUpAdmin);
router.post("/admin/login", validation, adminAuth.loginAdmin);
router.get("/admin/is-verify", authorization, adminAuth.verifyAdmin);
router.get("/admin/dashboard", authorization, adminAuth.getAdminDashboard);

module.exports = router;
