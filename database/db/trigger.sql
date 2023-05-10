--1.
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


--2. NOT IMPORTANT JUST INT IS ENOUGH
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


--3. 
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


--4
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


--5
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


--6
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


