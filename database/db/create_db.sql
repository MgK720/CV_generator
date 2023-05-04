CREATE TABLE CV(
    cvID serial,
    createDate Date NOT NULL, --on insert 
    lastChangeDate Date NOT NULL, --on update
    cvURL Varchar(50) NOT NULL,
    CONSTRAINT cvID_pk PRIMARY KEY(cvID)
);

CREATE TABLE PersonalData(
    personalDataID serial,
    cvID int NOT NULL,
    firstname Varchar(30) NOT NULL,
    lastname Varchar(30) NOT NULL,
    email Varchar(45) NOT NULL,
    phoneCountry int NOT NULL, --max 3 numbers
    phone int NOT NULL, --max 9 numbers
    imgDestination Varchar(50),
    CONSTRAINT personalDataID_pk PRIMARY KEY(personalDataID),
    CONSTRAINT cvID_fk FOREIGN KEY(cvID) REFERENCES CV(cvID)
);

CREATE TABLE KnowledgeType(
    knowledgeTypeID serial, --{0 - course, 1 - school}
    knowledgeTypeName Varchar(20) NOT NULL,
    CONSTRAINT knowledgeTypeID_pk PRIMARY KEY(knowledgeTypeID)
);

CREATE TABLE SchoolType(
    schoolTypeID serial, --{0 - primary, 1 - mid, 2 - high}
    schoolTypeName Varchar(20) NOT NULL,
    CONSTRAINT schoolTypeID_pk PRIMARY KEY(schoolTypeID)
);

CREATE TABLE Knowledge(
    knowledgeID serial,
    cvID int NOT NULL,
    knowledgeName Varchar(40) NOT NULL,
    knowledgeTypeID int NOT NULL, --max 1 number
    schoolTypeID int, --can be null
    startDateKnowledge Date NOT NULL,
    endDateKnowledge Date NOT NULL,
    description Varchar(100),
    CONSTRAINT knowledgeID_pk PRIMARY KEY(knowledgeID),
    CONSTRAINT cvID_fk FOREIGN KEY(cvID) REFERENCES CV(cvID),
    CONSTRAINT knowledgeTypeID_fk FOREIGN KEY(knowledgeTypeID) REFERENCES KnowledgeType(knowledgeTypeID),
    CONSTRAINT schoolTypeID_fk FOREIGN KEY(schoolTypeID) REFERENCES SchoolType(schoolTypeID)
);

CREATE TABLE Job(
    jobID serial,
    cvID int NOT NULL,
    jobName Varchar(40) NOT NULL,
    startDateJob Date NOT NULL,
    endDateJob Date NOT NULL,
    CONSTRAINT jobID_pk PRIMARY KEY(jobID),
    CONSTRAINT cvID_fk FOREIGN KEY(cvID) REFERENCES CV(cvID)
)

CREATE TABLE Skill(
    skillID serial,
    cvID int NOT NULL,
    skillName Varchar(25) NOT NULL,
    level int NOT NULL, -- {1,2,3,4,5}
    CONSTRAINT skillID_pk PRIMARY KEY(skillID),
    CONSTRAINT cvID_fk FOREIGN KEY(cvID) REFERENCES CV(cvID)
)

CREATE TABLE Link(
    linkID serial,
    cvID int NOT NULL,
    linkURL Varchar(100) NOT NULL,
    linkName Varchar(25) NOT NULL,
    CONSTRAINT linkID_pk PRIMARY KEY(linkID),
    CONSTRAINT cvID_fk FOREIGN KEY(cvID) REFERENCES CV(cvID)
)

CREATE TABLE Hobby(
    hobbyID serial,
    cvID int NOT NULL,
    hobbyName Varchar(25) NOT NULL,
    CONSTRAINT hobbyID_pk PRIMARY KEY(hobbyID),
    CONSTRAINT cvID_fk FOREIGN KEY(cvID) REFERENCES CV(cvID)
)



