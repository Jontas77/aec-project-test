import { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider } from "@mui/material";
import Content from "../../components/home/Content";
import Footer from "../../components/home/Footer";
import Loading from "../../components/services/Loading";
//import theme from '../../themes/theme';

const Home = (props) => {
	const [data, setData] = useState({
		featured_projects: [],
		testimonials: [],
		team: [],
	});
	const [error, setError] = useState({
		featured_projects: false,
		testimonials: false,
		team: false,
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const getData = async () => {
			const routes = ["featured_projects"]; //, "testimonials", "team"

		for (let x = 0; x < routes.length; x++) {
				const res = await fetch(`/api/${routes[x]}`, {
				method: "GET",
				headers: { token: localStorage.user?.user_id },
			});
				const body = await res.json();
				if (res.status !== 200) {
					setError((prevState) => ({
						...prevState,
						[routes[x]]: true,
					}));
				} else {
					setData((prevState) => ({
						...prevState,
						[routes[x]]: body,
					}));
				}
			}
			setLoading(false);
		};

		getData();
	}, [refresh]);

	return (
		<MainContainer>
			{loading ? (
				<Loading />
			) : (
				<Content
					featured_projects={data.featured_projects}
					testimonials={data.testimonials}
					team={data.team}
				/>
			)}
			<Divider orientation="horizontal" flexItem border-color="primary.grey" />

			<Footer />
		</MainContainer>
	);
};

export default Home;

const MainContainer = styled.div`
	min-height: 90vh;
	margintop: 1rem;
	overflow-x: hidden;
`;
