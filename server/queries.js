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
  const cv_url = `http://cv/${Math.floor(Math.random() * 100000)}.cv`;
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
      const cvID = await addCv(cv_url);
      outputMessage += `Cv added with ID: ${cvID} <br>\n`;

      personaldata.img_destination += cvID; // do zmiany (rozszerzenie itp)
      const personalDataID = await addPersonalData(cvID, personaldata.firstname, personaldata.lastname, personaldata.email, personaldata.phone_country, personaldata.phone, personaldata.img_destination);
      outputMessage += `PersonalData added with ID: ${personalDataID} <br>\n`;

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

      console.log(outputMessage);
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

module.exports = {
  createCv,
}