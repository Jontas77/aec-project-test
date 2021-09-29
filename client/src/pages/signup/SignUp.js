import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { withSnackbar } from "notistack";
import moment from "moment";

const SignUp = (props) => {
	const [values, setValues] = useState({
		full_name: "",
		email: "",
		password: "",
		role: "student",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { full_name, email, password, role } = values;
		if (full_name && email && password && role) {
			const emailIsValid = validateEmail(email, role);
			if (emailIsValid) {
				try {
					const body = {
						student_name: full_name,
						student_email: email,
						student_password: password,
					};

					const response = await fetch(`/auth/${role}/sign-up`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body),
					});
					const parseRes = await response.json();

					localStorage.setItem("token", parseRes.id);

					if (parseRes.token) {
						//localStorage.setItem("token", parseRes.id);
						let newUser = {
							auth: true,
							role: role,
							user_id: parseRes.token,
							last_login: moment().format("YYYY-MM-DD HH:mm"),
						};
						await localStorage.setItem("user", JSON.stringify(newUser));
						props.changeUser(newUser);

						props.enqueueSnackbar("Signed up sucessfully!", {
							variant: "success",
						});
					} else {
						props.enqueueSnackbar("Couldn't sign you up at the moment!", {
							variant: "error",
						});
					}
				} catch (error) {
					props.enqueueSnackbar("Sign up failed!", {
						variant: "error",
					});
				}
			} else {
				props.enqueueSnackbar("Invalid email", {
					variant: "error",
				});
			}
		} else {
			props.enqueueSnackbar("Please provide all fields", { variant: "error" });
		}
	};

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};
	const validateEmail = (email, role) => {
		if (role === "student") {
			let domain = "@sun.ac.za";
			let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

			if (regex.test(email) && email.includes(domain)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};

	return (
		<Container
			sx={{
				backgroundImage: "url('/images/background/bg1.png')",
				maxWidth: "100%",
				minHeight: "90vh",
				paddingBottom: "2rem",
				marginTop: "2rem",
			}}
		>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{`${values.role
							.replace("?", "")
							.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
								return g1.toUpperCase() + g2.toLowerCase();
							})}  Registration`}
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
							id="name"
							label="First Name"
							name="first_name"
							autoComplete="name"
							value={values.first_name}
							onChange={handleChange}
						/>
						{/* STUDENT SURNAME */}
						<TextField
							margin="normal"
							required
							fullWidth
							label="Last Name"
							name="last_name"
							autoComplete="surname"
							value={values.last_name}
							onChange={handleChange}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							value={values.email}
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="off"
							value={values.password}
							onChange={handleChange}
							inputProps={{
								autocomplete: "new-password",
								form: {
									autocomplete: "off",
								},
							}}
						/>
						<TextField
							fullWidth
							label="Role"
							name="role"
							onChange={handleChange}
							required
							select
							SelectProps={{ native: true }}
							value={values.role}
							variant="outlined"
							sx={{ marginTop: "1.2rem" }}
						>
							<option key="student" value="student">
								Student
							</option>
							<option key="mentor" value="mentor">
								Mentor
							</option>
						</TextField>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, textTransform: "none" }}
							onClick={handleSubmit}
						>
							Sign Up
						</Button>
						<Grid container>
							<Grid item xs>
								<FormLink href="#" variant="body2">
									Need help signing up?
								</FormLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</Container>
	);
};

export default withSnackbar(SignUp);
