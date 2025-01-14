import { Box, Stack, Typography, Grid, Container } from "@mui/material";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

import FeaturedProjects from "./FeaturedProjects";
import Testimonials from "./Testimonials";
import Team from "./Team";
import BcgImage from "./bg1.png";
import JoinPic from "../../images/home/join2.png";
//import theme from '../../themes/theme';

const Content = () => {
	let history = useHistory();

	return (
		<Container
			sx={{
				backgroundImage: `url(${BcgImage})`,
				maxWidth: "100%",
				minHeight: "90vh",
				paddingBottom: "1rem",
			}}
		>
			<Stack direction="column" sx={{ margin: "4rem 1rem 2rem 1rem" }}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Typography
								sx={{
									fontWeight: "600",
									fontSize: "2.4rem",
									textAlign: "center",
								}}
							>
								Advancing Engaged Citizenship
							</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Box
								sx={{
									padding: "1rem",
								}}
							>
								<WrappingText>
									<WrappedImage
										onClick={() => history.push("/student/sign-up")}
									>
										<img src={JoinPic} alt="join now" />
									</WrappedImage>
									A platform where students can journey with a team of mentors
									to assist with the innovation of project ideas, during the
									conceptualization and implementation phase. It allows students
									to complete a standard template with prompts to answer key
									questions. It also allows university staff to provide feedback
									and mentorship via the platform.
								</WrappingText>
							</Box>
						</Grid>
					</Grid>
				</Box>
				<FeaturedProjects />
				<Team />
				<Testimonials />
			</Stack>
		</Container>
	);
};

export default Content;

const WrappingText = styled.div`
	width: 100%;
`;
const WrappedImage = styled.div`
	cursor: pointer;
	img {
		float: right;
		margin: 1rem;
		width: 150px;
	}
`;
