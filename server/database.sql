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

CREATE TABLE IF NOT EXISTS projects (
  project_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  project_name varchar NOT NULL,
  project_target_group varchar NOT NULL,
  project_description varchar NOT NULL,
  project_image varchar NULL,
  CONSTRAINT projects_pkey PRIMARY KEY (project_id),
  CONSTRAINT projects_project_name_key UNIQUE (project_name)
);

CREATE TABLE featured_projects (
id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
name      VARCHAR(500) NOT NULL,
description     VARCHAR(10000) NOT NULL,
participants  VARCHAR(100)[],
target_groups VARCHAR(100)[],
img   VARCHAR(800),
year      VARCHAR(20)
);

CREATE TABLE team (
id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
name      VARCHAR(200) NOT NULL,
role    VARCHAR(200) NOT NULL,
img   VARCHAR(500)
);

CREATE TABLE testimonials (
id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
name      VARCHAR(200) NOT NULL,
message    VARCHAR(3000) NOT NULL,
img   VARCHAR(500)
);

CREATE TABLE students_profile (
student_id uuid UNIQUE REFERENCES students(student_id),
student_number BIGINT NOT NULL,
student_phone BIGINT NOT NULL,
student_bio VARCHAR(3000) NOT NULL,
student_img   VARCHAR(500),
student_active BOOLEAN NOT NULL
);