const {upload, getFileDetails} = require('./upload_img.js')
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
const createCv = async (request, response) => {
    let outputMessage = '';
    const cv_url = `http://cv.com/${Math.floor(Math.random() * 100000)}.cv`
    const personaldata = {
        firstname : request.body.firstname,
        lastname : request.body.lastname,
        email : request.body.email,
        phone_country : request.body.phone_country,
        phone : request.body.phone,
    };
    let img_destination = '';
    getFileDetails(async (fileDir, fileName) => {
        img_destination = `imgs/${fileName}`;
        console.log("my img dest:" + img_destination)});
    try{
        console.log(request.body);

        const cvID = await addCv(cv_url);
        outputMessage += `Cv added with ID: ${cvID} <br>\n`;

        const personalDataID = await addPersonalData(cvID, personaldata.firstname, personaldata.lastname, personaldata.email, personaldata.phone_country, personaldata.phone, img_destination);
        outputMessage += `PersonalData added with ID: ${personalDataID}, img_destination: ${img_destination} <br>\n`;
        
        outputMessage += await addKnowledgeEntries(cvID, request.body);

        outputMessage += await addExperienceEntries(cvID, request.body);

        outputMessage += await addSkillEntries(cvID, request.body);

        outputMessage += await addHobbyEntries(cvID, request.body);

        outputMessage += await addLinkEntries(cvID, request.body);
    
        console.log(outputMessage);

        response.render('confirm_generation/confirm', {
            cvID: cvID,
            msg: '',
        })
        //response.status(201).send(outputMessage);
    }catch (error){
        console.error(error);
        //response.status(500).send("Error while creating CV");
        response.render('confirm_generation/confirm', {
            cvID: -1,
            msg: 'Some inputs not valid',
        });
    }

  }
const addCv = async (cv_url) =>{
    try{
        const cvResult = await pool.query('INSERT INTO cv(cv_id, create_date, cv_url) VALUES (DEFAULT, DEFAULT, $1) RETURNING *', [cv_url]);
        console.log(`cv_id = ${cvResult.rows[0].cv_id}`)
        return cvResult.rows[0].cv_id;
    }catch (error){
        console.log(error);
        throw error;
    }
}

const addPersonalData = async (cvID, firstname, lastname, email, phone_country, phone, img_destination)  =>{
    try{
        const personalDataResult = await pool.query(`INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination) 
                                                    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                                                    [cvID, firstname, lastname, email,phone_country, phone,img_destination]);
    console.log(`personaldata_id = ${personalDataResult.rows[0].personaldata_id}`);
    return personalDataResult.rows[0].personaldata_id;
    }catch (error){
        console.log(error);
        throw error;
    }
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
  
const addKnowledgeEntries = async (cvID, data) => {
    try{
        let outputMessage = '';
        let numberOfKnowledge = 0;
        let knowledgeWithNumber = "knowledge_name" + numberOfKnowledge;
        console.log("knowledgewithnumber:" + knowledgeWithNumber);
        while(data[knowledgeWithNumber]){
            let knowledge_name = data["knowledge_name" + numberOfKnowledge];
            let knowledgetype_id = data["knowledge_type" + numberOfKnowledge];
            let schooltype_id = data["school_type" + numberOfKnowledge];
            let start_date_knowledge = data["start_date_knowledge" + numberOfKnowledge];
            let end_date_knowledge = data["end_date_knowledge" + numberOfKnowledge];
            let description = data["education_description" + numberOfKnowledge];

            let knowledgeID = await addKnowledge(cvID, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description);

            outputMessage += `Knowledge added with ID: ${knowledgeID} <br>\n`;

            numberOfKnowledge +=1;
            knowledgeWithNumber = "knowledge_name" + numberOfKnowledge;
        };
        console.log(`Total knowledge entries: ${numberOfKnowledge}`);
        return outputMessage;
    }catch (error){
        console.log(error);
        throw error; //wyrzucenie error do try catch blok wyzej
    }
}

const addExperienceEntries = async (cvID, data) => {
    try{
        let outputMessage = '';
        let numberOfExperience = 0;
        let experienceWithNumber = "job_name" + numberOfExperience;
        while(data[experienceWithNumber]){
            let job_name = data["job_name" + numberOfExperience];
            let start_date_job = data["start_date_job" + numberOfExperience];
            let end_date_job = data["end_date_job" + numberOfExperience];

            let experienceID = await addExperience(cvID, job_name, start_date_job, end_date_job);

            outputMessage += `Experience added with ID: ${experienceID} <br>\n`;

            numberOfExperience +=1;
            experienceWithNumber = "job_name" + numberOfExperience;
        };
        console.log(`Total experience entries: ${numberOfExperience}`);
        return outputMessage;
    }catch (error){
        console.log(error);
        throw error;
    }

}

const addSkillEntries = async (cvID, data) =>{
    try{
        let outputMessage = '';
        let numberOfSkill = 0;
        let skillWithNumber = "skill_name" + numberOfSkill;
        while(data[skillWithNumber]){
            let skill_name = data["skill_name" + numberOfSkill];
            let level = data["skill_level" + numberOfSkill];

            let skillID = await addSkill(cvID, skill_name, level);

            outputMessage += `Skill added with ID: ${skillID} <br>\n`

            numberOfSkill+=1;
            skillWithNumber = "skill_name" + numberOfSkill;
        };
        console.log(`Total skill entries: ${numberOfSkill}`);
        return outputMessage;
    }catch (error){
        console.log(error);
        throw error;
    }
}

const addHobbyEntries = async (cvID, data) => {
    try{
        let outputMessage = '';
        let numberOfHobby = 0;
        let hobbyWithNumber = "hobby_name" + numberOfHobby;
        while(data[hobbyWithNumber]){
            let hobby_name = data["hobby_name" + numberOfHobby];

            let hobbyID = await addHobby(cvID, hobby_name);

            outputMessage += `Hobby added with ID: ${hobbyID} <br>\n`

            numberOfHobby +=1;
            hobbyWithNumber = "hobby_name" + numberOfHobby;
        };
        console.log(`Total hobby entries: ${numberOfHobby}`);
        return outputMessage;
    }catch (error){
        console.log(error);
        throw error;
    }
}

const addLinkEntries = async (cvID, data) => {
    try{
        let outputMessage = '';
        let numberOfLink = 0;
        let linkWithNumber = "link_name" + numberOfLink;
        while(data[linkWithNumber]){
            let link_url = data["link_url" + numberOfLink];
            let link_name = data["link_name" + numberOfLink];

            let linkID = await addLink(cvID, link_url, link_name);

            outputMessage += `Link added with ID: ${linkID} <br>\n`

            numberOfLink +=1;
            linkWithNumber = "link_name" + numberOfLink;
        };
        console.log(`Total link entries: ${numberOfLink}`);
        return outputMessage;
    }catch (error){
        console.log(error);
        throw error;
    }
}
module.exports = {
  createCv,
}