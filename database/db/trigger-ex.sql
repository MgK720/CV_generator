--1. phone country number validation
INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
VALUES (DEFAULT, 1, 'firstname', 'lastname', 'email', 1000, 999999999, 'img-dest');

--2. phone number validation (site doesnt work for all phone numbers at this moment)
INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
VALUES (DEFAULT, 1, 'firstname', 'lastname', 'email', 999, 9999999991, 'img-dest');

--3. start_date_knowledge and end_date_knowledge validation
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 1, 2, '2024-06-22', '2023-03-22', 'description');

--4. knowledgetype_id validation
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 2, 2, '2023-03-22', '2023-03-22', 'description');

--5. schooltype_id validation
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 1, 3, '2023-03-22', '2023-03-22', 'description');

--6. is schooltype_id = null if knowledgetype = 0 ('course' doesnt have schooltype input)
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 0, 2, '2023-03-22', '2023-03-22', 'description');

--7. skill level between <1, 5> validation
INSERT INTO skill(skill_id, cv_id, skill_name, level)
VALUES (DEFAULT, 1, 'skill_name', 6);

--8. start_date_job and end_date_job validation
INSERT INTO job(job_id, cv_id, job_name, start_date_job, end_date_job)
VALUES (DEFAULT, 1, 'job_name', '2024-06-22', '2023-03-22');