--1. phone country number validation
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_phone_country()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.phone_country > 999 THEN
        RAISE EXCEPTION 'This is not valid country phone';
    END IF;
    IF new.phone_country < 1 THEN
        RAISE EXCEPTION 'This is not valid country phone';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingPhoneCountry
	BEFORE INSERT OR UPDATE
	ON personaldata
	FOR EACH ROW
		EXECUTE PROCEDURE checking_phone_country();


--2. phone number validation (site doesnt work for all phone numbers at this moment)
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_phone()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.phone > 999999999 THEN
        RAISE EXCEPTION 'This is not valid phone';
    END IF;
    IF new.phone < 100000000 THEN
        RAISE EXCEPTION 'This is not valid phone';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingPhone
	BEFORE INSERT OR UPDATE
	ON personaldata
	FOR EACH ROW
		EXECUTE PROCEDURE checking_phone();


--3. start_date_knowledge and end_date_knowledge validation
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_education_startend_date()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.start_date_knowledge > new.end_date_knowledge THEN
        RAISE EXCEPTION 'start_date must be < than end_date';
    END IF;
    IF new.start_date_knowledge > DATE(NOW()) THEN
        RAISE EXCEPTION 'start_date cant be future date';
    END IF;
    IF new.end_date_knowledge > DATE(NOW()) THEN
        RAISE EXCEPTION 'end_date cant be future date';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingEducationStartEndDate
	BEFORE INSERT OR UPDATE
	ON knowledge
	FOR EACH ROW
		EXECUTE PROCEDURE checking_education_startend_date();


--4 knowledgetype_id validation
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_education_knowledgetype_id()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.knowledgetype_id > 1 THEN
        RAISE EXCEPTION 'incorrect knowledgetype_id';
    END IF;
    IF new.knowledgetype_id < 0 THEN
        RAISE EXCEPTION 'incorrect knowledgetype_id';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingEducationKnowledgeTypeId
	BEFORE INSERT OR UPDATE
	ON knowledge
	FOR EACH ROW
		EXECUTE PROCEDURE checking_education_knowledgetype_id();


--5 schooltype_id validation
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_education_schooltype_id()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.schooltype_id > 2 THEN
        RAISE EXCEPTION 'incorrect schooltype_id';
    END IF;
    IF new.schooltype_id < 0 THEN
        RAISE EXCEPTION 'incorrect schooltype_id';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingEducationSchoolTypeId
	BEFORE INSERT OR UPDATE
	ON knowledge
	FOR EACH ROW
		EXECUTE PROCEDURE checking_education_schooltype_id();


--6 is schooltype_id = null if knowledgetype = 0 ('course' doesnt have schooltype input)
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_education_schooltype_id_optional()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.schooltype_id IS NOT NULL AND new.knowledgetype_id = 0 THEN
        RAISE EXCEPTION 'schooltype_id must be null if knowledgetype = 0 (course)';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingEducationSchoolTypeIdOptional
	BEFORE INSERT OR UPDATE
	ON knowledge
	FOR EACH ROW
		EXECUTE PROCEDURE checking_education_schooltype_id_optional();


--7 skill level between <1, 5> validation
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_skill_level()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.level < 1 THEN
        RAISE EXCEPTION 'skill level must be greater or equal 1';
    END IF;
    IF new.level > 5 THEN
        RAISE EXCEPTION 'skill level must be lower or equal 5';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingSkillLevel
	BEFORE INSERT OR UPDATE
	ON skill
	FOR EACH ROW
		EXECUTE PROCEDURE checking_skill_level();


--8 start_date_job and end_date_job validation
SET client_encoding TO 'UTF-8';
CREATE FUNCTION checking_job_startend_date()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.start_date_job > new.end_date_job THEN
        RAISE EXCEPTION 'start_date must be < than end_date';
    END IF;
    IF new.start_date_job > DATE(NOW()) THEN
        RAISE EXCEPTION 'start_date cant be future date';
    END IF;
    IF new.end_date_job > DATE(NOW()) THEN
        RAISE EXCEPTION 'end_date cant be future date';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingJobStartEndDate
	BEFORE INSERT OR UPDATE
	ON job
	FOR EACH ROW
		EXECUTE PROCEDURE checking_job_startend_date();
--9 skill_name in skill table w/o " , " char
SET client_encoding TO 'UTF-8';
CREATE FUNCTION check_comma_in_skill_name()
    RETURNS TRIGGER
AS $$
BEGIN
    IF new.skill_name LIKE '%,%' THEN
        RAISE EXCEPTION 'skill_name must not contain comma';
    END IF;
    RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER CheckingCommaInSkillName
	BEFORE INSERT OR UPDATE
	ON skill
	FOR EACH ROW
		EXECUTE PROCEDURE check_comma_in_skill_name();

