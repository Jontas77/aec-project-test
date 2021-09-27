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
CREATE TABLE projects (
  project_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  project_name varchar NOT NULL,
  project_target_group varchar NOT NULL,
  project_description varchar NOT NULL,
  project_image varchar NULL,
  CONSTRAINT projects_pkey PRIMARY KEY (project_id),
  CONSTRAINT projects_project_name_key UNIQUE (project_name)
);