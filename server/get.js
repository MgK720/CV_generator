const Pool = require('pg').Pool
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const getCv = async (request, response) => {
    const id = request.params.id;
    outputData = {
        personaldata: [],
        knowledge: [],
        experience: [],
        skill: [],
        hobby: [],
        link: []
    }

    try{
        const getPersonalData = await pool.query('SELECT * FROM personaldata WHERE cv_id = $1', [id]);
        outputData.personaldata = getPersonalData.rows;

        const getKnowledgeData = await pool.query('SELECT * FROM knowledge WHERE cv_id = $1', [id]);
        outputData.knowledge = getKnowledgeData.rows;

        const getExperienceData = await pool.query('SELECT * FROM job WHERE cv_id = $1', [id]);
        outputData.experience = getExperienceData.rows;

        const getSkillData = await pool.query('SELECT * FROM skill WHERE cv_id = $1', [id]);
        outputData.skill = getSkillData.rows;

        const getHobbyData = await pool.query('SELECT * FROM hobby WHERE cv_id = $1', [id]);
        outputData.hobby = getHobbyData.rows;

        const getLinkData = await pool.query('SELECT * FROM link WHERE cv_id = $1', [id]);
        outputData.link = getLinkData.rows;

        console.log(outputData);
        response.status(200).send(outputData);
    }catch (error){
        console.log(error);
        response.status(500).send("Error while getting data");
    }
}

module.exports = {
    getCv,
}
