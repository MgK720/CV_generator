--1.
INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
VALUES (DEFAULT, 1, 'firstname', 'lastname', 'email', 1000, 999999999, 'img-dest');

--2. NOT IMPORTANT JUST INT IS ENOUGH FOR NUMBERS > 999 999 999
INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
VALUES (DEFAULT, 1, 'firstname', 'lastname', 'email', 999, 9999999991, 'img-dest');

--3 
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 1, 2, '2023-06-22', '2023-03-22', 'description');

--4
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 2, 2, '2023-03-22', '2023-03-22', 'description');

--5
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 1, 3, '2023-03-22', '2023-03-22', 'description');

--6
INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 0, 2, '2023-03-22', '2023-03-22', 'description');