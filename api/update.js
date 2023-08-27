const {upload, getFileDetails, deleteFile} = require('./upload_img.js')
const {addKnowledge, addExperience, addSkill, addHobby, addLink} = require('./create.js');
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
const updateCv = async (request, response) =>{
  console.log(request.body);
  let outputMessage = '';
  let cvID = request.body.cv_id;
  try{
    outputMessage += await updatePersonaldata(cvID, request.body, request.file);
    outputMessage += await updateAllKnowledge(cvID, request.body);
    outputMessage += await updateAllExperience(cvID, request.body);
    outputMessage += await updateAllSkills(cvID, request.body);
    outputMessage += await updateAllHobby(cvID, request.body);
    outputMessage += await updateAllLinks(cvID, request.body);
    console.log(outputMessage);
    //response.send(outputMessage);
    response.render('confirm_generation/confirm', {
      cvID: cvID,
      msg: 'successfully updated',
      errorUpdate: false,
      errorDelete: false
  })
  }catch(e){
    console.error(e)
    response.render('confirm_generation/confirm', {
      cvID: cvID,
      msg: 'Some inputs not valid',
      errorUpdate: true,
      errorDelete: false
  });
  }
//TODO IF NO CHANGES DONT CONSOLE LOG
}
const updatePersonaldata = async(cvID, data, file)=>{
  let output = `cv_id = ${cvID}, personaldata_id = ${data.personaldata_id} updated <br> \n`;
  try{
    let updatePersonaldataQuery = 'Update personaldata set firstname=$2, lastname=$3, email =$4, phone_country=$5, phone=$6 where personaldata_id=$1';
    const newPersonaldataValues = [data.personaldata_id, data.firstname, data.lastname, data.email, data.phone_country, data.phone];
    if(file){
      updatePersonaldataQuery = 'Update personaldata set firstname=$2, lastname=$3, email =$4, phone_country=$5, phone=$6, img_destination=$7 where personaldata_id=$1';
      newimg_destination =`imgs/${file.filename}`;
      newPersonaldataValues.push(newimg_destination);
    }
    const updateResult = await pool.query(updatePersonaldataQuery,newPersonaldataValues)
    if(file){
      if(data.img_destination){
        const resultDeleteFile = deleteFile(data.img_destination)
        output += resultDeleteFile;
      }
    }
    return output;
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateOrCreateKnowledge = async(cvID, knowledge_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description) => {
  let typeOfProcess = '';
  let result = ''
  let output = ''
  try{
    //console.log(`knowledge_id= ${knowledge_id}`)
      if (knowledge_id == -1) {
          typeOfProcess = 'create';
          result = await addKnowledge(cvID, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description);
      } else {
          typeOfProcess = 'update';
          result = await updateKnowledge(knowledge_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description);
      }
      output += `${result}, process = ${typeOfProcess} <br>\n`
      return output
  }catch (e){
      console.log(e);
      throw e;
  }
}
const updateOrCreateExperience = async(cvID, job_id, job_name,start_date_job,end_date_job) =>{
  let typeOfProcess = '';
  let result = ''
  let output = ''
  try{
      if (job_id == -1) {
          typeOfProcess = 'create';
          result = await addExperience(cvID, job_name,start_date_job,end_date_job);
      } else {
          typeOfProcess = 'update';
          result = await updateExperience(job_id, job_name,start_date_job,end_date_job);
      }
      output += `${result}, process = ${typeOfProcess} <br>\n`
      return output
  }catch (e){
      console.log(e);
      throw e;
  }
}

const updateOrCreateSkill  = async (cvID, skillID, skill_name, skill_level) =>{
  let typeOfProcess = '';
  let result = ''
  let output = ''
  try{
      if (skillID == -1) {
          typeOfProcess = 'create';
          result = await addSkill(cvID, skill_name, skill_level);
      } else {
          typeOfProcess = 'update';
          result = await updateSkill(skillID, skill_name, skill_level);
      }
      output += `${result}, process = ${typeOfProcess} <br>\n`
      return output
  }catch (e){
      console.log(e);
      throw e;
  }
}

const updateOrCreateHobby = async (cvID, hobby_id, hobby_name) =>{
  let typeOfProcess = '';
  let result = ''
  let output = ''
  try{
      if (hobby_id == -1) {
          typeOfProcess = 'create';
          result = await addHobby(cvID, hobby_name);
      } else {
          typeOfProcess = 'update';
          result = await updateHobby(hobby_id, hobby_name);
      }
      output += `${result}, process = ${typeOfProcess} <br>\n`
      return output
  }catch (e){
      console.log(e);
      throw e;
  }
}

const updateOrCreateLink = async (cvID, link_id, link_url, link_name) =>{
  let typeOfProcess = '';
  let result = ''
  let output = ''
  try{
      if (link_id == -1) {
          typeOfProcess = 'create';
          result = await addLink(cvID, link_url, link_name);
      } else {
          typeOfProcess = 'update';
          result = await updateLink(link_id, link_url, link_name);
      }
      output += `${result}, process = ${typeOfProcess} <br>\n`
      return output
  }catch (e){
      console.log(e);
      throw e;
  }
}
const updateKnowledge = async(knowledge_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description) => {
  try{
      if(knowledgetype_id != 1 ) {schooltype_id = null};
      console.log(start_date_knowledge);
      const updateResult = await pool.query(`Update knowledge Set 
      knowledge_name=$2, knowledgetype_id=$3, schooltype_id=$4, start_date_knowledge=$5,end_date_knowledge=$6, description = $7 where knowledge_id=$1`, 
      [knowledge_id, knowledge_name, knowledgetype_id,schooltype_id,start_date_knowledge,end_date_knowledge,description]);
      return `knowledge_id = ${knowledge_id} updated`;
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateExperience = async(job_id, job_name,start_date_job,end_date_job) =>{
  try{
    const updateResult = await pool.query(`Update job Set
    job_name=$2, start_date_job=$3,end_date_job=$4 where job_id=$1`,
    [job_id,job_name,start_date_job,end_date_job]);
    return `job_id = ${job_id} updated`;
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateSkill = async (skillID, skill_name, skill_level) => {
  try{
      const updateResult = await pool.query('Update skill Set skill_name= $2, level =$3 where skill_id=$1', [skillID, skill_name, skill_level]);
      return `skill_id = ${skillID} updated`;
  }catch (e){
      console.log(e);
      throw e;
  }
}
const updateHobby = async (hobby_id, hobby_name) =>{
  try {
      const updateResult = await pool.query('Update hobby Set hobby_name=$2 where hobby_id=$1', [hobby_id,hobby_name]);
      return `hobby_id = ${hobby_id} updated`;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
const updateLink = async (link_id, link_url, link_name) =>{
  try {
      const updateResult = await pool.query('Update Link Set link_url=$2, link_name=$3 where link_id=$1', [link_id,link_url,link_name]);
      return `link_id = ${link_id} updated`;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
const updateAllKnowledge = async(cvID, data) =>{
  try{
    let output = '';
    let numberOfKnowledge = 0;
    let knowledgeNameWithNumber = data['knowledge_name' + numberOfKnowledge];
    while(knowledgeNameWithNumber){
        let knowledge_name = data['knowledge_name' + numberOfKnowledge];
        let knowledge_type = data['knowledge_type' + numberOfKnowledge];
        //console.log(data['knowledge_type3']);
        let school_type = data['school_type' + numberOfKnowledge];
        let start_date_knowledge = data['start_date_knowledge' + numberOfKnowledge];
        let end_date_knowledge = data['end_date_knowledge' + numberOfKnowledge];
        let description = data['education_description' + numberOfKnowledge];
        let knowledge_id = data['knowledge_id' + numberOfKnowledge];
        if(knowledge_id){
          output = await updateOrCreateKnowledge(cvID,knowledge_id, knowledge_name, knowledge_type, school_type, start_date_knowledge, end_date_knowledge, description);
        }else{
          output = await updateOrCreateKnowledge(cvID,-1, knowledge_name, knowledge_type, school_type, start_date_knowledge, end_date_knowledge, description);
        }
        numberOfKnowledge +=1;
        knowledgeNameWithNumber = data['knowledge_name' + numberOfKnowledge];
    }
    if(output){
      return output;
    }else{
      return `cvID = ${cvID} no knowledge Data `
    }
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateAllExperience = async(cvID, data) =>{
  try{
    let output = '';
    let numberOfExperience = 0;
    let experienceNameWithNumber = data['job_name' + numberOfExperience];
    while(experienceNameWithNumber){
        let job_name = data['job_name' + numberOfExperience];
        let start_date_job = data['start_date_job' + numberOfExperience];
        let end_date_job = data['end_date_job' + numberOfExperience];
        let job_id = data['job_id' + numberOfExperience];
        if(job_id){
          output = await updateOrCreateExperience(cvID,job_id, job_name, start_date_job, end_date_job);
        }else{
          output = await updateOrCreateExperience(cvID,-1, job_name, start_date_job, end_date_job);
        }
        numberOfExperience +=1;
        experienceNameWithNumber = data['job_name' + numberOfExperience];
    }
    if(output){
      return output;
    }else{
      return `cvID = ${cvID} no experience Data `
    }
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateAllSkills = async(cvID, data) =>{
  try{
    let output = '';
    let numberOfSkill = 0;
    let skillNameWithNumber = data['skill_name' + numberOfSkill];
    while(skillNameWithNumber){
        let skill_name = data['skill_name' + numberOfSkill];
        let skill_level = data['skill_level' + numberOfSkill];
        let skill_id = data['skill_id' + numberOfSkill];
        if(skill_id){
          output = await updateOrCreateSkill(cvID,skill_id, skill_name, skill_level);
        }else{
          output = await updateOrCreateSkill(cvID,-1, skill_name, skill_level);
        }
        numberOfSkill +=1;
        skillNameWithNumber = data['skill_name' + numberOfSkill];
    }
    if(output){
      return output;
    }else{
      return `cvID = ${cvID} no skill Data `
    }
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateAllHobby = async (cvID, data)=>{
  try {
    let output = '';
    let numberOfHobby = 0;
    let hobbyNameWithNumber = data['hobby_name' + numberOfHobby];
    while(hobbyNameWithNumber){
        let hobby_name = data['hobby_name' + numberOfHobby];
        let hobby_id = data['hobby_id' + numberOfHobby];
        if(hobby_id){
          output = await updateOrCreateHobby(cvID,hobby_id, hobby_name);
        }else{
          output = await updateOrCreateHobby(cvID,-1, hobby_name);
        }
        numberOfHobby +=1;
        hobbyNameWithNumber = data['hobby_name' + numberOfHobby];
    }
    if(output){
      return output;
    }else{
      return `cvID = ${cvID} no hobby Data `
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}
const updateAllLinks = async (cvID, data)=>{
  try {
    let output = '';
    let numberOflink = 0;
    let linkNameWithNumber = data['link_name' + numberOflink];
    while(linkNameWithNumber){
        let link_name = data['link_name' + numberOflink];
        let link_url = data['link_url' + numberOflink];
        let link_id = data['link_id' + numberOflink];
        if(link_id){
          output = await updateOrCreateLink(cvID,link_id, link_url,link_name);
        }else{
          output = await updateOrCreateLink(cvID,-1, link_url,link_name);
        }
        numberOflink +=1;
        linkNameWithNumber = data['link_name' + numberOflink];
    }
    if(output){
      return output;
    }else{
      return `cvID = ${cvID} no link Data `
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}
module.exports = {
  updateCv,
}