import React from "react";
import {
	Container,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	ListItemText,
	IconButton,
} from "@mui/material";
import { Edit, ExpandMore } from "@mui/icons-material";

export const Review = ({ formData, navigation }) => {
	const { go } = navigation;
	const {
		project_name,
		problem_statement,
		proposed_action,
		expected_result,
		social_returns,
		key_activities,
		key_resources,
		team,
		client_profile,
		client_relationships,
		client_channels,
		key_partners,
		stakeholders,
		networks,
		startup_costs,
		operational_costs,
		finance_plan,
		business_plan,
		implementation_plan,
		key_milestones,
		monitoring_and_evaluation,
		who_we_are,
		vision_and_mission,
		track_record,
	} = formData;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("token", localStorage.token);

		try {
			const body = formData;
			console.log(body);
			const response = await fetch("/api/student/projects/proposal", {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify(body),
			});
			const parseData = await response.json();

			console.log(parseData);
		} catch (error) {
			console.error(error.message);
		}
	};
	return (
		<Container maxWidth="md">
			<h3>Review</h3>
			<RenderAccordion
				summary="Step1"
				go={go}
				details={[
					{ "The Project": project_name },
					{ "Problem Statement": problem_statement },
					{ "Proposed Action": proposed_action },
				]}
			/>
			<RenderAccordion
				summary="Step2"
				go={go}
				details={[
					{ "Expected Result": expected_result },
					{ "Social Returns": social_returns },
				]}
			/>
			<RenderAccordion
				summary="Step3"
				go={go}
				details={[
					{ "Key Activities": key_activities },
					{ "Key Resources": key_resources },
					{ Team: team },
				]}
			/>
			<RenderAccordion
				summary="Step4"
				go={go}
				details={[
					{ "Client Profile": client_profile },
					{ "Client Relationships": client_relationships },
					{ "Client Channels": client_channels },
				]}
			/>
			<RenderAccordion
				summary="Step5"
				go={go}
				details={[
					{ "Key Partners": key_partners },
					{ Stakeholders: stakeholders },
					{ Networks: networks },
				]}
			/>
			<RenderAccordion
				summary="Step6"
				go={go}
				details={[
					{ "Startup Costs": startup_costs },
					{ "Operational Costs": operational_costs },
				]}
			/>
			<RenderAccordion
				summary="Step7"
				go={go}
				details={[
					{ "Finance Plan": finance_plan },
					{ "Business Plan": business_plan },
				]}
			/>
			<RenderAccordion
				summary="Step8"
				go={go}
				details={[
					{ "Implementation Plan": implementation_plan },
					{ "Key Milestones": key_milestones },
					{ "Monitoring And Evaluation": monitoring_and_evaluation },
				]}
			/>
			<RenderAccordion
				summary="Step9"
				go={go}
				details={[
					{ "Who We Are": who_we_are },
					{ "Vision And Mission": vision_and_mission },
					{ "Track Record": track_record },
				]}
			/>
			<Button
				color="primary"
				variant="contained"
				style={{ marginTop: "1rem" }}
				onClick={(e) => {
					handleSubmit(e);
					go("submit");
				}}
			>
				Submit
			</Button>
		</Container>
	);
};

export const RenderAccordion = ({ summary, details, go }) => {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMore />}>{summary}</AccordionSummary>
			<AccordionDetails>
				<div>
					{details.map((data, idx) => {
						const objKey = Object.keys(data)[0];
						const objValue = data[Object.keys(data)[0]];

						return (
							<ListItemText key={idx}>{`${objKey}: ${objValue}`}</ListItemText>
						);
					})}
					<IconButton
						color="primary"
						component="span"
						onClick={() => go(`${summary.toLowerCase()}`)}
					>
						<Edit />
					</IconButton>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};
