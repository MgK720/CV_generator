CREATE DOMAIN url AS text
CHECK (VALUE ~ '^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,6}(\/[-a-zA-Z0-9@:%._\+~#=]*)*(\?[-a-zA-Z0-9@:%_\+.~#()?&//=]*)?$');
COMMENT ON DOMAIN url IS 'match URLs (http or https)';


CREATE TABLE cv(
    cv_id serial, 
    create_date TIMESTAMPTZ DEFAULT Now(), --on insert DONE
    CONSTRAINT cv_pk PRIMARY KEY(cv_id)
);

CREATE TABLE account(
    account_id serial,
    cv_id int UNIQUE,
    login varchar(20) not null UNIQUE CHECK (LENGTH(login) > 7), 
    password varchar(255) not null CHECK (LENGTH(password) > 7),
    CONSTRAINT account_pk PRIMARY KEY(account_id),
    CONSTRAINT account_cv_fk FOREIGN KEY(cv_id) REFERENCES cv(cv_id) ON DELETE SET NULL
);

CREATE TABLE personaldata(
    personaldata_id serial,
    cv_id int NOT NULL UNIQUE,
    firstname Varchar(30) NOT NULL,
    lastname Varchar(30) NOT NULL,
    email Varchar(45) NOT NULL,
    phone_country int NOT NULL, --max 3 numbers DONE
    phone int NOT NULL, --max 9 numbers DONE 
    img_destination Varchar(50),
    CONSTRAINT personaldata_pk PRIMARY KEY(personaldata_id),
    CONSTRAINT personaldata_cvid_fk FOREIGN KEY(cv_id) REFERENCES cv(cv_id) ON DELETE CASCADE
);

CREATE TABLE knowledgetype(
    knowledgetype_id serial, --{0 - course, 1 - school} DONE
    knowledgetype_name Varchar(20) NOT NULL,
    CONSTRAINT knowledgetype_pk PRIMARY KEY(knowledgetype_id)
);

CREATE TABLE schooltype(
    schooltype_id serial, --{0 - primary, 1 - mid, 2 - high} DONE
    schooltype_name Varchar(20) NOT NULL,
    CONSTRAINT schooltype_pk PRIMARY KEY(schooltype_id)
);

CREATE TABLE knowledge(
    knowledge_id serial,
    cv_id int NOT NULL,
    knowledge_name Varchar(40) NOT NULL,
    knowledgetype_id int NOT NULL, --max 1 number - do przerobienia w html i js
    schooltype_id int, --can be null max 1 number - do przerobienia w html i js if knowledgetype==0 then set schooltype_id as null (php)
    start_date_knowledge Date NOT NULL,
    end_date_knowledge Date NOT NULL,
    description Varchar(70),
    CONSTRAINT knowledge_pk PRIMARY KEY(knowledge_id),
    CONSTRAINT knowledge_cvid_fk FOREIGN KEY(cv_id) REFERENCES cv(cv_id) ON DELETE CASCADE,
    CONSTRAINT knowledge_type_fk FOREIGN KEY(knowledgetype_id) REFERENCES knowledgetype(knowledgetype_id),
    CONSTRAINT knowledge_school_fk FOREIGN KEY(schooltype_id) REFERENCES schooltype(schooltype_id)
);

CREATE TABLE job(
    job_id serial,
    cv_id int NOT NULL,
    job_name Varchar(40) NOT NULL,
    start_date_job Date NOT NULL,
    end_date_job Date NOT NULL,
    CONSTRAINT job_pk PRIMARY KEY(job_id),
    CONSTRAINT job_cvid_fk FOREIGN KEY(cv_id) REFERENCES cv(cv_id) ON DELETE CASCADE
);

CREATE TABLE skill(
    skill_id serial,
    cv_id int NOT NULL,
    skill_name Varchar(25) NOT NULL,
    level int NOT NULL, -- {1,2,3,4,5}
    CONSTRAINT skill_pk PRIMARY KEY(skill_id),
    CONSTRAINT skill_cvid_fk FOREIGN KEY(cv_id) REFERENCES cv(cv_id) ON DELETE CASCADE
);

CREATE TABLE hobby(
    hobby_id serial,
    cv_id int NOT NULL,
    hobby_name Varchar(25) NOT NULL,
    CONSTRAINT hobby_pk PRIMARY KEY(hobby_id),
    CONSTRAINT hobby_cvid_fk FOREIGN KEY(cv_id) REFERENCES cv(cv_id) ON DELETE CASCADE
);

CREATE TABLE link(
    link_id serial,
    cv_id int NOT NULL,
    link_url url NOT NULL,
    link_name Varchar(25) NOT NULL,
    CONSTRAINT link_pk PRIMARY KEY(link_id),
    CONSTRAINT link_cvid_fk FOREIGN KEY(cv_id) REFERENCES cv(cv_id) ON DELETE CASCADE
);

--TODO rename diagram col.
