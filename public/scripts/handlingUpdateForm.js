$(document).ready(function() {
    //prepareMyForm();
    //console.log(outputData);
    setUpdateFormStatus();
    setCvId();
    getPersonalData();
    educationDataFromDbCount = getAllKnowledgeData();
    experienceDataFromDbCount = getAllExperienceData();
    skillDataFromDbCount = getAllSkillData();
    hobbyDataFromDbCount = getAllHobbyData();
    linkDataFromDbCount = getAllLinkData();
 });
function setCvId(){
  $('#cv_id').val(outputData.personaldata[0].cv_id);
}
function setUpdateFormStatus(){
  $('form').attr('formStatus', 'update')
}

function getPersonalData(index = 0){
    let personalData = outputData.personaldata[index];
      $('#personaldata_id').val(personalData.personaldata_id)
      $('input[name="personaldata_id"]').val(personalData.personaldata_id);
      $('#firstname').val(personalData.firstname);

      $('#lastname').val(personalData.lastname);

      if(personalData.img_destination){
        $('#img_destination').val(personalData.img_destination);
      }

      $('#email').val(personalData.email);

      $('#phone_country').val(personalData.phone_country);

      $('#phone').val(personalData.phone);
}

function getKnowledgeData(index){
  let knowledge = outputData.knowledge[index];
    $(`#knowledge_id${index}`).val(knowledge.knowledge_id)
    $(`#knowledge_name${index}`).val(knowledge.knowledge_name)
    $(`#knowledge_type${index}`).val(knowledge.knowledgetype_id)
    if(knowledge.schooltype_id == 0 || knowledge.schooltype_id == 1 || knowledge.schooltype_id == 2){
      console.log(knowledge.schooltype_id + "dsahjndhskahdlajshdjhsaldsa");
      $(`#school_type${index}`).val(knowledge.schooltype_id)
    }else if(knowledge.schooltype_id == null){
      $(`#school_type${index}`).removeAttr("required")
    }
    $(`#start_date_knowledge${index}`).val(knowledge.start_date_knowledge)
    $(`#end_date_knowledge${index}`).val(knowledge.end_date_knowledge)
    $(`#end_date_knowledge${index}`).attr('min',knowledge.start_date_knowledge)

    $(`#education_description${index}`).val(knowledge.description)
}

function getExperienceData(index){
  let experience = outputData.experience[index];
    $(`#job_id${index}`).val(experience.job_id)
    $(`#job_name${index}`).val(experience.job_name);
    $(`#start_date_job${index}`).val(experience.start_date_job);
    $(`#end_date_job${index}`).val(experience.end_date_job);
    $(`#end_date_job${index}`).attr('min',experience.start_date_job)
}

function getSkillData(index){
  let skill = outputData.skill[index];
  $(`#skill_id${index}`).val(skill.skill_id);
  $(`#skill_name${index}`).val(skill.skill_name);
  $(`#skill_level${index}`).val(skill.level);
};

function getHobbyData(index){
  let hobby = outputData.hobby[index];
  $(`#hobby_id${index}`).val(hobby.hobby_id);
  $(`#hobby_name${index}`).val(hobby.hobby_name);
}

function getLinkData(index){
  let link = outputData.link[index];
  $(`#link_id${index}`).val(link.link_id);
  $(`#link_url${index}`).val(link.link_url);
  $(`#link_name${index}`).val(link.link_name);
}

function getAllKnowledgeData(){
  if(outputData.knowledge.length){
    getKnowledgeData(0);
    //console.log(outputData.knowledge[0]);
    schoolTypeShowOnAdded(0)
    for(let i = 1; i < outputData.knowledge.length; i++){
      //console.log(outputData.knowledge[i]);
      const place = document.getElementById("education" + addEducationCount);
      addEducationCount++; 

      createEducationSection(place);

      const newEducationSectionPlace = document.getElementById("education" + addEducationCount);
      prepareEducationSectionForUpdateForm(newEducationSectionPlace);

      getKnowledgeData(i);

      schoolTypeShowOnAdded(i)
    }
  }
  return outputData.knowledge.length;
}


function getAllExperienceData(){
  if(outputData.experience.length){
    getExperienceData(0);
    for(let i = 1; i < outputData.experience.length; i++){
      //console.log(outputData.experience[i]);
      const place = document.getElementById('experience' + addExperienceCount);
      addExperienceCount++;

      createExperienceSection(place);

      const newExperienceSectionPlace = document.getElementById("experience" + addExperienceCount);
      prepareExperienceSectionForUpdateForm(newExperienceSectionPlace);

      getExperienceData(i);
    }
  }
  return outputData.experience.length;
}

function getAllSkillData(){
  if(outputData.skill.length){
    getSkillData(0);
    levelParagraphOnAdded(0);
    for(let i = 1;i < outputData.skill.length; i++){
      const place = document.getElementById('skill' + addSkillCount)
      addSkillCount++;

      createSkillSection(place);

      const newSkillSectionPlace = document.getElementById("skill" + addSkillCount);
      prepareSkillSectionForUpdateForm(newSkillSectionPlace);

      getSkillData(i);
      levelParagraphOnAdded(i);
    }
  }
  return outputData.skill.length;
}

function getAllHobbyData(){
  if(outputData.hobby.length){
    getHobbyData(0);
    for(let i = 1; i< outputData.hobby.length; i++){
      const place = document.getElementById('hobby' + addHobbyCount);
      addHobbyCount++;

      createHobbySection(place);

      const newHobbySectionPlace = document.getElementById("hobby" + addHobbyCount);
      prepareHobbySectionForUpdateForm(newHobbySectionPlace);

      getHobbyData(i);
    }
  }
  return outputData.hobby.length;
}

function getAllLinkData(){
  if(outputData.link.length){
    getLinkData(0);
    for(let i = 1; i< outputData.link.length; i++){
      const place = document.getElementById('link' + addLinkCount);
      addLinkCount++;

      createLinkSection(place);

      const newLinkSectionPlace = document.getElementById("link" + addLinkCount);
      prepareLinkSectionForUpdateForm(newLinkSectionPlace);

      getLinkData(i);
    }
  }
  return outputData.link.length;
}

function prepareMyForm(){
  $('form').setAttribute("action", 'done')
}


function prepareEducationSectionForUpdateForm(place){
  const educationIdElement = document.createElement('input');
  setAttributes(educationIdElement, {"type": "number", "name": "knowledge_id" + addEducationCount, "id": "knowledge_id" + addEducationCount, "class": "hidden_id"});
  place.insertBefore(educationIdElement, place.firstChild);
}

function prepareExperienceSectionForUpdateForm(place){
  const jobIdElement = document.createElement('input');
  setAttributes(jobIdElement, {"type": "number", "name": "job_id" + addExperienceCount, "id": "job_id" + addExperienceCount, "class": "hidden_id"})
  place.insertBefore(jobIdElement, place.firstChild);
}

function prepareSkillSectionForUpdateForm(place){
  const skillIdElement = document.createElement('input');
  setAttributes(skillIdElement, {"type": "number", "name": "skill_id" + addSkillCount, "id": "skill_id" + addSkillCount, "class": "hidden_id"})
  place.insertBefore(skillIdElement, place.firstChild);
}
function prepareHobbySectionForUpdateForm(place){
  const hobbyIdElement = document.createElement('input');
  setAttributes(hobbyIdElement, {"type": "number", "name": "hobby_id" + addHobbyCount, "id": "hobby_id" + addHobbyCount, "class": "hidden_id"})
  place.insertBefore(hobbyIdElement, place.firstChild);
}
function prepareLinkSectionForUpdateForm(place){
  const linkIdElement = document.createElement('input');
  setAttributes(linkIdElement, {"type": "number", "name": "link_id" + addLinkCount, "id": "link_id" + addLinkCount, "class": "hidden_id"})
  place.insertBefore(linkIdElement, place.firstChild);
}

function getImg(input, img_destination){
  if(img_destination){
    const file = new File([""], '/' + img_destination);
    input.files = [file];
    console.log(input.files);
  }
}