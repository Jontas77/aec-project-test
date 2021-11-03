import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import Step1 from "../stepForm/Step1";
import Step2 from "../stepForm/Step2";
import Step3 from "../stepForm/Step3";
import Step4 from "../stepForm/Step4";
import Step5 from "../stepForm/Step5";
import Step6 from "../stepForm/Step6";
import Step7 from "../stepForm/Step7";
import Step8 from "../stepForm/Step8";
import Step9 from "../stepForm/Step9";
import { Review } from "../stepForm/Review";
import Submit from "../stepForm/Submit";

const defaultData = {
	project_name: "",
	problem_statement: "",
	proposed_action: "",
	expected_result: "",
	social_returns: "",
	key_activities: "",
	key_resources: "",
	team: "",
	client_profile: "",
	client_relationships: "",
	client_channels: "",
	key_partners: "",
	stakeholders: "",
	networks: "",
	startup_costs: "",
	operational_costs: "",
	finance_plan: "",
	business_plan: "",
	implementation_plan: "",
	key_milestones: "",
	monitoring_and_evaluation: "",
	who_we_are: "",
	vision_and_mission: "",
	track_record: "",
};

const steps = [
	{ id: "step1" },
	{ id: "step2" },
	{ id: "step3" },
	{ id: "step4" },
	{ id: "step5" },
	{ id: "step6" },
	{ id: "step7" },
	{ id: "step8" },
	{ id: "step9" },
	{ id: "review" },
	{ id: "submit" },
];

const AddProposal = ({ setPage }) => {
	const [formData, setForm] = useForm(defaultData);

	const { step, navigation } = useStep({
		steps,
		initialStep: 0,
	});

	const props = { formData, setForm, navigation, setPage };

	switch (step.id) {
		case "step1":
			return <Step1 {...props} />;
		case "step2":
			return <Step2 {...props} />;
		case "step3":
			return <Step3 {...props} />;
		case "step4":
			return <Step4 {...props} />;
		case "step5":
			return <Step5 {...props} />;
		case "step6":
			return <Step6 {...props} />;
		case "step7":
			return <Step7 {...props} />;
		case "step8":
			return <Step8 {...props} />;
		case "step9":
			return <Step9 {...props} />;
		case "review":
			return <Review {...props} />;
		case "submit":
			return <Submit {...props} />;

	}

	return (
		<div>
			<h1>Add New Proposal Here</h1>
		</div>
	);
};

export default AddProposal;
