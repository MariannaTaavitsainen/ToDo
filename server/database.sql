DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS account;

CREATE TABLE task (
  id serial primary key,
  description varchar(255) not null
);

CREATE TABLE account (
  id serial primary key,
  email varchar(50) not null unique,
  password varchar(255) not null
);

INSERT INTO task (description) VALUES
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to production'),
('Conduct a code review with peers');
