import React, { useState, useEffect } from "react";
import FormLink from "@mui/material/Link";
import {
	Box,
	Modal,
	Grid,
	TextField,
	Button,
	Avatar,
	CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { withSnackbar } from "notistack";
import moment from "moment";
import { elapsedTimeStr, pascalCase } from "../../components/services/utils";

const LogIn = (props) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		role: props.user.role || "student",
		user_id: "",
		last_login: props.user.last_login,
	});

	useEffect(() => {
		let localUserData = localStorage.getItem("user");
		if (localUserData) {
			let userProfile = JSON.parse(localUserData);
			const minutes = elapsedTimeStr(userProfile.last_login, false);
			if (minutes > 720) {
				props.changeUser({
					auth: false,
					role: "",
					user_id: "",
					last_login: "",
				});
				localStorage.removeItem("user");
			} else {
				props.changeUser(userProfile);
                handleModalClose();
                props.history.push(`/${userProfile.role}/dashboard`);
			}
		}
	}, []);

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalOpen = () => setModalOpen(true);
	const handleModalClose = () => setModalOpen(false);

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		handleModalOpen();
        const { email, password, role } = values;

		try {
			const body = {
				student_email: email,
				student_password: password,
			};
			const response = await fetch(`/auth/${role}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parseRes = await response.json();
			if (parseRes.token) {
				//localStorage.setItem("token", parseRes.token);
				//setAuth(true);
				let newUser = {
					auth: true,
					role: role,
					user_id: parseRes.token,
					last_login: moment().format("YYYY-MM-DD HH:mm"),
				};
				await localStorage.setItem("user", JSON.stringify(newUser));
				props.changeUser(newUser);

				props.enqueueSnackbar("Logged in sucessfully!", {
					variant: "success",
				});
				handleModalClose();
				props.history.push(`/${role}/dashboard`);
			} else {
				handleModalClose();
				props.enqueueSnackbar("Error! Couldn't log you in at the moment", {
					variant: "error",
				});
			}
		} catch (error) {
			props.enqueueSnackbar("Error! Couldn't log you in at the moment", {
				variant: "error",
			});
		}
	};

	return (
		<Container
			sx={{
				backgroundImage: "url('/images/background/bg1.png')",
				width: "100%",
				minHeight: "100vh",
				paddingTop: "1rem",
				paddingBottom: "1rem",
			}}
		>
			<Modal
				open={modalOpen}
				onClose={handleModalClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ marginBottom: "1rem" }}
					>
						Loading...
					</Typography>
					<CircularProgress size="2rem" />
				</Box>
			</Modal>
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
						{`${pascalCase(values.role)} Log In`}
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
							autoComplete="current-password"
							value={values.password}
							onChange={handleChange}
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
							sx={{ marginTop: "0.9rem" }}
						>
							<option key="student" value="student">
								Student
							</option>
							<option key="mentor" value="mentor">
								Mentor
							</option>
							<option key="admin" value="admin">
								Administrator
							</option>
						</TextField>
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
			</Container>
		</Container>
	);
};

export default withSnackbar(LogIn);

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};
