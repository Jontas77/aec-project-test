CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE students (
id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
gender VARCHAR(7) NOT NULL,
stud_num INT NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
phone INT NOT NULL,
state VARCHAR(50) NOT NULL,
bio VARCHAR(3000) NOT NULL,
img   VARCHAR(500),
password VARCHAR(100) NOT NULL,
active BOOLEAN NOT NULL
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