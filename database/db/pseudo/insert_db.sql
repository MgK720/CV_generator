-- PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE 
-- PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE PSEUDOCODE 

--IMPORTANT HOW TO GET SERIAL ID AND SET IT IN ANOTHER TABLE
--prawdopodobnie lepszym wariantem będzie przechwycenie tego cv_id za pomocą php
--With something do -> everything (all inserts)
--WITH inserted_cvid AS (
--    INSERT INTO cv(cv_id, create_date, lastchange_date, cv_url) 
--    VALUES (DEFAULT, '2023-03-12', '2023-03-22', 'elo') RETURNING cv_id
--)
--INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
--VALUES (DEFAULT, (select cv_id from inserted_cvid), 'aaa', 'lastname', 'email', 3, 4, 'ala');

INSERT INTO cv(cv_id, create_date, cv_url) 
VALUES (DEFAULT, DEFAULT, 'cv_url');


--trigg phone_country must be between 1-999 and phone must have 9 numbers
INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination)
VALUES (DEFAULT, (select cv_id from inserted_cvid), firstname, lastname, email, trigg(phone_country), trigg(phone), generated(img_destination));


--pre inserted tables knowledgetype and schooltype

-- [*] if value == 'course' then in knowledge set knowledgetype_id = 0 else if value == 'school' set knowledgetype_id = 1
INSERT INTO knowledgetype(knowledgetype_id, knowledgetype_name)
VALUES (0, 'course');

INSERT INTO knowledgetype(knowledgetype_id, knowledgetype_name)
VALUES (1, 'school');

-- [**] if value == 'primary' then in knowledge set schooltype_id = 0 else if value == 'mid-school' set schooltype_id = 1 else if value == "high-school" set schooltype_id = 2
INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (0, 'primary');

INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (1, 'mid-school');

INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (2, 'high-school');


INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
VALUES (DEFAULT, (select cv_id from inserted_cvid), knowledge_name, [*]generated(knowledgetype_id), [**]generated(schooltype_id), start_date_knowledge, end_date_knowledge, description);


INSERT INTO job(job_id, cv_id, job_name, start_date_job, end_date_job)
VALUES (DEFAULT, (select cv_id from inserted_cvid), job_name, start_date_job, end_date_job);


--level <1,5>
INSERT INTO skill(skill_id, cv_id, skill_name, level)
VALUES (DEFAULT, (select cv_id from inserted_cvid), skill_name, trigg(level))


INSERT INTO hobby(hobby_id, cv_id, hobby_name)
VALUES (DEFAULT, (select cv_id from inserted_cvid), hobby_name)


INSERT INTO link(link_id, cv_id, link_url, link_name)
VALUES (DEFAULT, (select cv_id from inserted_cvid), link_url, link_name)


