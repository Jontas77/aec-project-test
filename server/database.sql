CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE students (
  student_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) UNIQUE NOT NULL,
  student_password VARCHAR(255) NOT NULL
);

CREATE TABLE mentors (
  mentor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_name VARCHAR(255) NOT NULL,
  mentor_email VARCHAR(255) UNIQUE NOT NULL,
  mentor_password VARCHAR(255) NOT NULL
);

CREATE TABLE admin (
  admin_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_name VARCHAR(255) NOT NULL,
  admin_email VARCHAR(255) UNIQUE NOT NULL,
  admin_password VARCHAR(255) NOT NULL
);

-- Drop table
-- DROP TABLE projects;

CREATE TABLE IF NOT EXISTS projects (
  project_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  project_name varchar NOT NULL,
  project_target_group varchar NOT NULL,
  project_description varchar NOT NULL,
  project_image varchar NULL,
  CONSTRAINT projects_pkey PRIMARY KEY (project_id),
  CONSTRAINT projects_project_name_key UNIQUE (project_name)
);

-- INITIAL COLUMNS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE proposals (
  proposal_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_name varchar UNIQUE NOT NULL,
  problem_statemnt varchar NOT NULL,
  proposed_action varchar NOT NULL,
  expected_result varchar NULL
);

-- ALL COLUMNS
CREATE TABLE proposals (
  proposal_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  proposal_name varchar NOT NULL,
  problem_statemnt varchar NOT NULL,
  proposed_action varchar NOT NULL,
  expected_result varchar NULL,
  social_returns varchar NULL,
  key_activities varchar NULL,
  key_resources varchar NULL,
  team varchar NULL,
  client_profile varchar NULL,
  client_relationships varchar NULL,
  client_channels varchar NULL,
  key_partners varchar NULL,
  stakeholders varchar NULL,
  netwokrs varchar NULL,
  finances varchar NULL,
  startup_costs varchar NULL,
  operational_costs varchar NULL,
  finance_plan varchar NULL,
  sustainabilit_Business Plan varchar NULL,
  implementation_plan varchar NULL,
  key_Milestones varchar NULL,
  monitoring_evaluation varchar NULL,
  who_we_are varchar NULL,
  vision_mission varchar NULL,
  track_record varchar NULL CONSTRAINT proposals_pkey PRIMARY KEY (proposal_id),
  CONSTRAINT proposals_project_name_key UNIQUE (proposal_name)
);