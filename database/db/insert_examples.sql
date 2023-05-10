
INSERT INTO cv(cv_id, create_date, cv_url) 
VALUES (DEFAULT, DEFAULT, 'cv_url');

INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
VALUES (DEFAULT, 1, 'firstname', 'lastname', 'email', 999, 999999999, 'img-dest');

INSERT INTO knowledgetype(knowledgetype_id, knowledgetype_name)
VALUES (0, 'course');

INSERT INTO knowledgetype(knowledgetype_id, knowledgetype_name)
VALUES (1, 'school');

INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (0, 'primary');

INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (1, 'mid-school');

INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (2, 'high-school');

INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'knowledge_name', 1, 2, '2023-03-22', '2023-03-22', 'description');
