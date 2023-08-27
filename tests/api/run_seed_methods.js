const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
const addCv = async () =>{
    try{
        const cvResult = await pool.query('INSERT INTO cv(cv_id, create_date) VALUES (DEFAULT, DEFAULT) RETURNING *');
    }catch (error){
        throw error;
    }
}

const addPersonalData = async (cvID, firstname, lastname, email, phone_country, phone, img_destination)  =>{
    try{
        const personalDataResult = await pool.query(`INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination) 
                                                    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                                                    [cvID, firstname, lastname, email,phone_country, phone,img_destination]);
    }catch (error){
        throw error;
    }
}

const addKnowledge = async (cvID, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description) =>{
    const knowledgeResult = await pool.query(`INSERT INTO knowledge(knowledge_id, cv_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description)
          VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [cvID, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description]);
}

const addExperience = async (cvID, job_name, start_date_job, end_date_job) => {
    const experienceResult = await pool.query(`INSERT INTO job(job_id, cv_id, job_name, start_date_job, end_date_job)
          VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *`,[cvID, job_name, start_date_job, end_date_job]);
}

const addSkill = async (cvID, skill_name, level) =>{
    const skillResult = await pool.query(`INSERT INTO skill(skill_id, cv_id, skill_name, level)
    VALUES (DEFAULT, $1, $2, $3) RETURNING *`, [cvID, skill_name, level]);
}

const addHobby = async(cvID, hobby_name) =>{
    const hobbyResult = await pool.query(`INSERT INTO hobby(hobby_id, cv_id, hobby_name)
    VALUES (DEFAULT, $1, $2) RETURNING *`, [cvID, hobby_name]);
}

const addLink = async(cvID, link_url, link_name) =>{
    const linkResult = await pool.query(`INSERT INTO link(link_id, cv_id, link_url, link_name)
    VALUES (DEFAULT, $1, $2, $3) RETURNING *`, [cvID, link_url, link_name]);
}

const register = async (cv_id, login, password)=>{
    try{
        const loginExists = await isLoginExists(login);
        if(!loginExists){
            let hashedPassword = await bcrypt.hash(password,10);
            try{
                const insertQuery = await pool.query('Insert Into account(account_id, cv_id, login,password) Values (DEFAULT, $1, $2, $3)', [cv_id, login, hashedPassword]);
            }catch(e){
                throw e;
            }
        }else{
            throw e;
        }
    }catch (error){
        throw e;
    }
  }

const isLoginExists = async (login) =>{
    try{
        const result = await pool.query('Select * from account where login=$1', [login]);
        if(result.rowCount == 0 ){
            return false;
        }
        return result.rows[0];
    }catch (error){
        throw error;
    }
}

const copyImages = async (count) => {
    setTimeout(()=>{
        fs.mkdir(path.resolve("./public/imgs"), { recursive: true }, (err) => {
            if (err) {
              console.error('Error creating directory:', err);
            } else {
              console.log('Directory created successfully!');
            }
          });
    }, 50)
    setTimeout(()=>{
        for(let i = 1; i <=count; i++){
            fs.copyFile(path.resolve(`./seeds/imgs/blank${i}.jpg`), path.resolve(`./public/imgs/blank${i}.jpg`), (err) => {
                if (err) throw err;
            });
            if(i == count){
                console.log("All images have been copied!")
            }
        }
    }, 100);
}


module.exports = {
    addCv,
    addPersonalData,
    addKnowledge,
    addExperience,
    addSkill,
    addHobby,
    addLink,
    register,
    copyImages
}