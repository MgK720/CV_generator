--Example insert for one cv with data in all tables
INSERT INTO knowledgetype(knowledgetype_id, knowledgetype_name)
VALUES (0, 'course'),
       (1, 'school');

INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (0, 'primary'),
       (1, 'mid-school'),
       (2, 'high-school');

INSERT INTO cv(cv_id, create_date, cv_url) 
VALUES (DEFAULT, DEFAULT, 'https://example.ex/79911231');

INSERT INTO account(account_id, cv_id, login, password)
VALUES (DEFAULT, 1, 'thomasJohnson', 'ncxnkasjdal248297478293dsajdbxzi3929');

INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
VALUES (DEFAULT, 1, 'ExampleName', 'ExampleLastname', 'myemail@example.ex', 48, 123456789, '/img/79911231.jpg');

INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge)
VALUES (DEFAULT, 1, 'Example University', 1, 2, '2019-09-30', '2022-06-30');

INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, 1, 'Example Course', 0, '2023-01-25', '2023-02-25', 'example, example, example'),
       (DEFAULT, 1, 'Example Course2', 0, '2022-05-15', '2022-06-05', 'example2, example2, example2');

INSERT INTO job(job_id, cv_id, job_name, start_date_job, end_date_job)
VALUES (DEFAULT, 1, 'Example Job', '2015-07-09', '2018-03-13'),
       (DEFAULT, 1, 'Example2 Job2', '2018-03-13', '2020-04-11'),
       (DEFAULT, 1, 'Example3 Job3', '2020-04-11', '2021-01-22');

INSERT INTO skill(skill_id, cv_id, skill_name, level)
VALUES (DEFAULT, 1, 'Example Skill', 2),
       (DEFAULT, 1, 'Example2 Skill2', 1),
       (DEFAULT, 1, 'Example3 Skill3', 4),
       (DEFAULT, 1, 'Example4 Skill4', 5),
       (DEFAULT, 1, 'Example5 Skill5', 2);

INSERT INTO hobby(hobby_id, cv_id, hobby_name)
VALUES (DEFAULT, 1, 'Exxample Hobby'),
       (DEFAULT, 1, 'Exxample2 Hobby2'),
       (DEFAULT, 1, 'Exxample3 Hobby3');

INSERT INTO link(link_id, cv_id, link_url, link_name)
VALUES (DEFAULT, 1, 'https://linkedin.com/example', 'Linkedin Name'),
       (DEFAULT, 1, 'https://example.com/example', 'Example Name');










