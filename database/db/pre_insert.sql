-- This must be inserted to db before web server start - run this file after create.sql and trigger.sql

INSERT INTO knowledgetype(knowledgetype_id, knowledgetype_name)
VALUES (0, 'course'),
       (1, 'school');

INSERT INTO schooltype(schooltype_id, schooltype_name)
VALUES (0, 'primary'),
       (1, 'mid-school'),
       (2, 'high-school');