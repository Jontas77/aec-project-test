import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HEADERS_DATA from "../../assets/data/headers_data";

const StudentLogin = ({ setAuth, changeHeaders }) => {
	const [inputs, setInputs] = useState({
		student_email: "",
		student_password: "",
	});

	const { student_email, student_password } = inputs;

	const handleChange = (e) => {
		setInputs((input) => {
			return { ...input, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const body = { student_email, student_password };

			const response = await fetch("/auth/student/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			const parseRes = await response.json();
			if (parseRes.token) {
				localStorage.setItem("token", parseRes.token);
				setAuth(true);
				changeHeaders(HEADERS_DATA.student);
				toast.success("Logged in successfully!");
			} else {
				setAuth(false);
				toast.error(parseRes);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const Copyright = (props) => {
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				align="center"
				{...props}
			>
				{"Copyright © "}
				<Link color="inherit" href="" to="https://github.com/DouglasVDM/aec">
					The A Team
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		);
	};

	return (
		<>
			<Container
				sx={{
					backgroundImage: "url('/images/background/bg1.png')",
					maxWidth: "100%",
					minHeight: "90vh",
					paddingBottom: "1rem",
				}}
			>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Student log in
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="student_email"
								autoComplete="email"
								value={student_email}
								onChange={(e) => handleChange(e)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="student_password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={student_password}
								onChange={(e) => handleChange(e)}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSubmit}
							>
								Log In
							</Button>
							<Grid container>
								<Grid item xs>
									<FormLink href="#" variant="body2">
										Forgot password?
									</FormLink>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Container>
			</Container>
		</>
	);
};

export default StudentLogin;
