const Pool = require('pg').Pool
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
const createCv = async (request, response) => {
    let outputMessage = '';
    const cv_url = `http://cv/${Math.floor(Math.random() * 100000)}.cv`
    //personaldata zamienic na object literal
    const personaldata = {
         firstname : request.body.firstname,
         lastname : request.body.lastname,
         email : request.body.myemail,
         phone_country : request.body.calling_code,
         phone : request.body.myphone_number,
         img_destination : `/img/`
    };
    try{
      console.log(request.body);
        //take data and insert into cv table
        const cvID = await addCv(cv_url);
        outputMessage += `Cv added with ID: ${cvID} <br>\n`;
        //take data and insert into personaldata table
        personaldata.img_destination += cvID; // do zmiany (rozszerzenie itp)
        const personalDataID = await addPersonalData(cvID, personaldata.firstname, personaldata.lastname, personaldata.email, personaldata.phone_country, personaldata.phone, personaldata.img_destination);
        outputMessage += `PersonalData added with ID: ${personalDataID} <br>\n`;
        //take data (mulltiple) and insert into knowledge table
        let numberOfKnowledge = 0;
        let knowledgeWithNumber = "school" + numberOfKnowledge;
        while(request.body[knowledgeWithNumber]){
            let knowledge_name = request.body["school" + numberOfKnowledge];
            let knowledgetype_id = request.body["knowledge_type" + numberOfKnowledge];
            let schooltype_id = request.body["school_type" + numberOfKnowledge];
            let start_date_knowledge = request.body["startyear" + numberOfKnowledge];
            let end_date_knowledge = request.body["endyear" + numberOfKnowledge];
            let description = request.body["education_description" + numberOfKnowledge];

            let knowledgeID = await addKnowledge(cvID, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description);

            outputMessage += `Knowledge added with ID: ${knowledgeID} <br>\n`;

            numberOfKnowledge +=1;
            knowledgeWithNumber = "school" + numberOfKnowledge;
        };
        //take data (multiple) and insert into experience table
        let numberOfExperience = 0;
        let experienceWithNumber = "job" + numberOfExperience;
        while(request.body[experienceWithNumber]){
            let job_name = request.body["job" + numberOfExperience];
            let start_date_job = request.body["startyear_job" + numberOfExperience];
            let end_date_job = request.body["endyear_job" + numberOfExperience];

            let experienceID = await addExperience(cvID, job_name, start_date_job, end_date_job);

            outputMessage += `Experience added with ID: ${experienceID} <br>\n`;

            numberOfExperience +=1;
            experienceWithNumber = "job" + numberOfExperience;
        };
        //take data (multiple) and insert into skill table
        let numberOfSkill = 0;
        let skillWithNumber = "skill_name" + numberOfSkill;
        while(request.body[skillWithNumber]){
            let skill_name = request.body["skill_name" + numberOfSkill];
            let level = request.body["skill_level" + numberOfSkill];

            let skillID = await addSkill(cvID, skill_name, level);

            outputMessage += `Skill added with ID: ${skillID} <br>\n`

            numberOfSkill+=1;
            skillWithNumber = "skill_name" + numberOfSkill;

        };
        //take data (multiple) and insert into hobby table
        let numberOfHobby = 0;
        let hobbyWithNumber = "hobby_name" + numberOfHobby;
        while(request.body[hobbyWithNumber]){
            let hobby_name = request.body["hobby_name" + numberOfHobby];

            let hobbyID = await addHobby(cvID, hobby_name);

            outputMessage += `Hobby added with ID: ${hobbyID} <br>\n`

            numberOfHobby +=1;
            hobbyWithNumber = "hobby_name" + numberOfHobby;

        };
        //take data (multiple) and insert into link table
        let numberOfLink = 0;
        let linkWithNumber = "link_name" + numberOfLink;
        while(request.body[linkWithNumber]){
            let link_url = request.body["link_url" + numberOfLink];
            let link_name = request.body["link_name" + numberOfLink];

            let linkID = await addLink(cvID, link_url, link_name);

            outputMessage += `Link added with ID: ${linkID} <br>\n`

            numberOfLink +=1;
            linkWithNumber = "link_name" + numberOfLink;

        };

        console.log(outputMessage);
        //console.log(request.body);
        response.status(201).send(outputMessage);
    }catch (error){
        console.error(error);
        response.status(500).send("Error while creating CV");
    }

  }
const addCv = async (cv_url) =>{
    const cvResult = await pool.query('INSERT INTO cv(cv_id, create_date, cv_url) VALUES (DEFAULT, DEFAULT, $1) RETURNING *', [cv_url]);
    console.log(`cv_id = ${cvResult.rows[0].cv_id}`)
    return cvResult.rows[0].cv_id;
}

const addPersonalData = async (cvID, firstname, lastname, email, phone_country, phone, img_destination)  =>{
    const personalDataResult = await pool.query(`INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination) 
                                                 VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                                                 [cvID, firstname, lastname, email,phone_country, phone,img_destination]);

    console.log(`personaldata_id = ${personalDataResult.rows[0].personaldata_id}`);
    return personalDataResult.rows[0].personaldata_id;
}

const addKnowledge = async (cvID, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description) =>{
    if(schooltype_id == false) {schooltype_id = null};
    const knowledgeResult = await pool.query(`INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
          VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [cvID, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description]);

    console.log(`knowledge_id = ${knowledgeResult.rows[0].knowledge_id}`);
    return knowledgeResult.rows[0].knowledge_id;
}

const addExperience = async (cvID, job_name, start_date_job, end_date_job) => {
    const experienceResult = await pool.query(`INSERT INTO job(job_id, cv_id, job_name, start_date_job, end_date_job)
          VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *`,[cvID, job_name, start_date_job, end_date_job]);

    console.log(`job_id = ${experienceResult.rows[0].job_id}`);
    return experienceResult.rows[0].job_id;
}

const addSkill = async (cvID, skill_name, level) =>{
    const skillResult = await pool.query(`INSERT INTO skill(skill_id, cv_id, skill_name, level)
    VALUES (DEFAULT, $1, $2, $3) RETURNING *`, [cvID, skill_name, level]);

    console.log(`skill_id = ${skillResult.rows[0].skill_id}`);
    return skillResult.rows[0].skill_id;
}

const addHobby = async(cvID, hobby_name) =>{
    const hobbyResult = await pool.query(`INSERT INTO hobby(hobby_id, cv_id, hobby_name)
    VALUES (DEFAULT, $1, $2) RETURNING *`, [cvID, hobby_name]);

    console.log(`hobby_id = ${hobbyResult.rows[0].hobby_id}`);
    return hobbyResult.rows[0].hobby_id;
}

const addLink = async(cvID, link_url, link_name) =>{
    const linkResult = await pool.query(`INSERT INTO link(link_id, cv_id, link_url, link_name)
    VALUES (DEFAULT, $1, $2, $3) RETURNING *`, [cvID, link_url, link_name]);

    console.log(`link_id = ${linkResult.rows[0].link_id}`);
    return linkResult.rows[0].link_id;
}
  
module.exports = {
  createCv,
}