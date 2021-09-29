import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { withSnackbar } from "notistack";

const EditStudentProfile = ({ setPage, profileInfo }) => {
	const [values, setValues] = useState({
		student_name: profileInfo?.student_name || "",
		student_number: profileInfo?.student_number || null,
		student_email: profileInfo?.student_email || "",
		student_phone: profileInfo?.student_phone || null,
		student_bio: profileInfo?.student_bio || "",
	});

	const saveProfileInfo = () => {
		if (
			values.student_name &&
			values.student_number &&
			values.student_email &&
			values.student_phone &&
			values.student_bio
		) {
			sendInfoToServer();
		} else {
			//props.enqueueSnackbar("Please provide all fields", { variant: "error" });
		}
	};

	const sendInfoToServer = async () => {
    setPage("profile");
  };

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Container
			sx={{
				backgroundImage: "url('/images/background/bg1.png')",
				maxWidth: "100%",
				minHeight: "90vh",
				paddingBottom: "1rem",
				marginTop: "2.5rem",
			}}
		>
			<form autoComplete="off" noValidate>
				<Card>
					<CardHeader
						subheader="You must fill in all the fields."
						title="Profile"
					/>
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Full name"
									name="student_name"
									onChange={handleChange}
									required
									value={values.student_name}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Student number"
									name="student_number"
									onChange={handleChange}
									type="number"
									required
									value={values.student_number}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Email Address"
									name="student_email"
									onChange={handleChange}
									required
									value={values.student_email}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Phone Number"
									name="student_phone"
									onChange={handleChange}
									type="number"
									required
									value={values.student_phone}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									multiline
									required
									fullWidth
									label="Bio"
									name="student_bio"
									onChange={handleChange}
									value={values.student_bio}
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							p: 2,
						}}
					>
						<Button
							color="primary"
							variant="contained"
							sx={{ marginRight: "1rem" }}
							endIcon={<CancelIcon />}
							onClick={() => {
								setPage("profile");
							}}
						>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="contained"
							endIcon={<SendIcon />}
							onClick={saveProfileInfo}
						>
							Save
						</Button>
					</Box>
				</Card>
			</form>
		</Container>
	);
};

export default withSnackbar(EditStudentProfile);
