var EDU_LIMIT = 5;
var JOB_LIMIT = 9;
var SKILL_LIMIT = 13;
var HOBBY_LIMIT = 7;
var LINK_LIMIT = 7;

var addEducationCount = 0;
var addExperienceCount = 0;
var addSkillCount = 0;
var addHobbyCount = 0;
var addLinkCount = 0;
window.addEventListener("load", (event) => {
    maxDate();
  });
function setAttributes(attrib, values){
    for(var key in values){
        attrib.setAttribute(key,values[key]);
    }
}

//lepiej korzystać z tego zamiast - event dziala jeszcze przed pelnym zaladowaniem jsa cssa/ reszty dodatkowych plikow
window.addEventListener("DOMContentLoaded", (event) =>{
    SchoolTypeShowOnRefresh();
    SkillLevelOnRefresh();
})
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function today(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    var currentDate;
    if(day > 9){currentDate = `${year}-0${month}-${day}`;}
    else{currentDate = `${year}-0${month}-0${day}`;}

    console.log(currentDate);
    return currentDate;

}
function maxDate(){
        var myEduDateInputFrom = document.getElementById("start_date_knowledge0");
        var myEduDateInputTo = document.getElementById("end_date_knowledge0");
        var myExpDateInputFrom = document.getElementById("start_date_job0");
        var myExpDateInputTo = document.getElementById("end_date_job0");


        myEduDateInputFrom.setAttribute("max",today());
        myEduDateInputFrom.setAttribute("value", today());

        myEduDateInputTo.setAttribute("max",today());
        myEduDateInputTo.setAttribute("value", today());

        myExpDateInputFrom.setAttribute("max",today());
        myExpDateInputFrom.setAttribute("value", today());

        myExpDateInputTo.setAttribute("max",today());
        myExpDateInputTo.setAttribute("value", today());

}

/* jquery CLS score of 0.1 or less - > myscore: 0.00004937*/
$( document ).on( "click", "input[type='date']",function(event){
        var idOfClickedElement = event.target.id;
        if(idOfClickedElement.includes("end_date")){
            return;
        }
        console.log(idOfClickedElement);
        var idEndDate = idOfClickedElement.replace("start", "end");
        console.log("my replaced id = " + idEndDate);
        
        $("input[name='"+ idOfClickedElement + "']").change(function() {
            $("input[name='"+ idEndDate + "']").attr("min",$(this).val());
        })
    })
//input and load
$( document ).on("input","input[type='range']", function(event){
        var idOfClickedElement = event.target.id;
        var valueOfClickedElement = event.target.value;
        console.log("my value = " + valueOfClickedElement);
        console.log(idOfClickedElement);

        var idNumber = idOfClickedElement.charAt(idOfClickedElement.length-1);
        console.log(idNumber);

        var idOfParagraph = "skill-level-value" + idNumber;
        console.log("my replaced id = " + idOfParagraph);

        var idOfParagraphSelector = $("p[id='" + idOfParagraph + "']");

        SkillLevelParagraphSet(valueOfClickedElement, idOfParagraphSelector);

})

function SkillLevelOnRefresh(){
    let skillLevelValue = document.getElementById("skill_level0").value;
    var paragraphSelector = $("p[id='skill-level-value0']");
    SkillLevelParagraphSet(skillLevelValue, paragraphSelector);
    
}

function SkillLevelParagraphSet(skillLevelValue, paragraphSelector){
    if(skillLevelValue == 1){
        paragraphSelector.text("Very Low");
        paragraphSelector.css("color", "#ff0000")
    }else if(skillLevelValue == 2){
        paragraphSelector.text("Low");
        paragraphSelector.css("color", "#ff4d00")
    }else if(skillLevelValue == 3){
        paragraphSelector.text("Medium");
        paragraphSelector.css("color", "#ffa300")
    }else if(skillLevelValue == 4){
        paragraphSelector.text("High");
        paragraphSelector.css("color", "#e3ff00")
    }else if(skillLevelValue == 5){
        paragraphSelector.text("Very High");
        paragraphSelector.css("color", "#a3ff00")
    }else{
        return;
    }
}
/*
--------------------LEGACY-----------------------------
function showLogMsg(message){
        var logElement = document.getElementById("log");
        var logSection = document.getElementById("log-section");
        logElement.textContent = message;
        logSection.style.display = "inline-block";
    
}
window.onload = document.getElementById("remove-log").addEventListener("click", function(){
    var logElement = document.getElementById("log");
    var logSection = document.getElementById("log-section");
    logElement.textContent = "";
    logSection.style.display = "none";
});*/


function schoolTypeShow(addEducationCount) {
    console.log(addEducationCount);
    for(var x = 0; x<=addEducationCount;x+=1){
        var knowledge = document.getElementById("knowledge_type" + x).value;
        if (knowledge == 1) {
            //inline-block
            document.getElementById("school_type" + x).required = true
            document.getElementById("school-type-select" + x).style.display = "flex";
        }
        else{
            document.getElementById("school_type" + x).required = false;
            document.getElementById("school_type" + x).value = "";
            document.getElementById("school-type-select" + x).style.display = "none";
            
    }
}
};

function SchoolTypeShowOnRefresh(){
    //Miałem problem z sessionStorage tego elementu podczas odswiezania strony zostawała wybrana przed refreshem wartość
    //nie działało to prawidłowo z funkcją schoolTypeShow, dlatego teraz po refreshu jesli uzytkownik wybral opcje "school"
    //to prawidłowo wyświetli sie select wyboru school_type
    if(document.getElementById("knowledge_type0").value == 1){
        document.getElementById("school_type0").required = true
        document.getElementById("school-type-select0").style.display = "flex";
    }
}

function createSpanValidity(){
    var spanValidity = document.createElement("span");
    spanValidity.setAttribute("class","validity");
    return spanValidity;
}


window.onload = document.getElementById("addEducation").addEventListener("click", function() {
    if(addEducationCount == EDU_LIMIT){
        console.log("Too much education records (LIMIT IS " + EDU_LIMIT  + " )");
        //showLogMsg("Too much education records");
        return;
    }
    console.log("You clicked addEducation");
    var place = document.getElementById("education" + addEducationCount);
    addEducationCount = addEducationCount +1;

    var newSection = document.createElement("section");
    newSection.setAttribute("id", "education" + addEducationCount);
    newSection.setAttribute("class", "education added_element");

    console.log("education"+addEducationCount+" added");

    var educationUl = document.createElement("ul");
    var knowledgeLi = document.createElement("li");
    var knowledgeTypeLi = document.createElement("li");
    var knowledgeDateLi = document.createElement("li");
    var knowledgeDescriptionLi = document.createElement("li");


    var knowledgeLabel = document.createElement("label");
    setAttributes(knowledgeLabel, {"for": "knowledge_name" + addEducationCount})
    knowledgeLabel.textContent = "Knowledge:";

    var knowledge = document.createElement("INPUT");
    setAttributes(knowledge, {"type": "text", "name": "knowledge_name" + addEducationCount, "id" : "knowledge_name" + addEducationCount, 
    "class" : "school", "minlength" : "1", "maxlength" : "45"});
    knowledge.required = true;

    var spanValidity0 = createSpanValidity();



    var knowledgeTypeLabel = document.createElement("label");
    setAttributes(knowledgeTypeLabel, {"for": "knowledge_type" + addEducationCount, "class": "knowledge_type"});
    knowledgeTypeLabel.textContent = "Type:";

    var knowledgeType = document.createElement("select");
    setAttributes(knowledgeType, {"name": "knowledge_type" + addEducationCount, "id": "knowledge_type" + addEducationCount, "onchange": "schoolTypeShow(addEducationCount)"});
    knowledgeType.required = true;

    var blankType0 = document.createElement("option");
    setAttributes(blankType0,{"value": ""});
    blankType0.textContent = "--option--";

    var firstKnowledgeType = document.createElement("option");
    setAttributes(firstKnowledgeType,{"value": "1"});
    firstKnowledgeType.textContent = "School";

    var secondKnowledgeType = document.createElement("option");
    setAttributes(secondKnowledgeType,{"value": "0"});
    secondKnowledgeType.textContent = "Course";

    knowledgeType.appendChild(blankType0);
    knowledgeType.appendChild(firstKnowledgeType);
    knowledgeType.appendChild(secondKnowledgeType);

    var spanValidity1 = createSpanValidity();



    var divForSchoolTypeSelect = document.createElement("div");
    setAttributes(divForSchoolTypeSelect, {"id": "school-type-select" + addEducationCount, "class": "school-type-select"});

    /*var schoolTypeLabel = document.createElement("label")
    setAttributes(schoolTypeLabel, {"for": "school-type" + addEducationCount});
    schoolTypeLabel.textContent = "SchoolType:";*/

    var schoolType = document.createElement("select")
    setAttributes(schoolType, {"name": "school_type" + addEducationCount, "id": "school_type" + addEducationCount});
    schoolType.required = true;


    var blankType1 = document.createElement("option");
    setAttributes(blankType1,{"value": ""});
    blankType1.textContent = "--option--";

    var firstSchoolType = document.createElement("option");
    setAttributes(firstSchoolType, {"value": "0"});
    firstSchoolType.textContent = "Primary";

    var secondSchoolType = document.createElement("option");
    setAttributes(secondSchoolType, {"value": "1"});
    secondSchoolType.textContent = "MidSchool";

    var thirdSchoolType = document.createElement("option");
    setAttributes(thirdSchoolType, {"value": "2"});
    thirdSchoolType.textContent = "HighSchool";

    var spanValidity2 = createSpanValidity();

    schoolType.appendChild(blankType1);
    schoolType.appendChild(firstSchoolType);
    schoolType.appendChild(secondSchoolType);
    schoolType.appendChild(thirdSchoolType);

    /*divForSchoolTypeSelect.appendChild(schoolTypeLabel);*/
    divForSchoolTypeSelect.appendChild(schoolType);
    divForSchoolTypeSelect.appendChild(spanValidity2);



    var startYearLabel = document.createElement("label");
    setAttributes(startYearLabel, {"for": "start_date_knowledge" + addEducationCount, class:"startyear"});
    startYearLabel.textContent = "From:";

    var startYear = document.createElement("input");
    //TODO walidacja dat (czy data zakonczenia jest pozniej niz data rozpoczecia) "max": today()
    setAttributes(startYear, {"type": "date", "name": "start_date_knowledge" + addEducationCount, "id": "start_date_knowledge" + addEducationCount, "min": "1900-01-01", "max": today(), "value": today()});
    startYear.required = true;

    var spanValidity3 = createSpanValidity();

    var endYearLabel = document.createElement("label");
    setAttributes(endYearLabel, {"for": "end_date_knowledge" + addEducationCount,class:"endyear"});
    endYearLabel.textContent = "To:";

    var endYear = document.createElement("input");
    setAttributes(endYear, {"type": "date", "name": "end_date_knowledge" + addEducationCount, "id": "end_date_knowledge" + addEducationCount, "min": "1900-01-01", "max": today(), "value": today()});
    endYear.required = true;

    var spanValidity4 = createSpanValidity();



    var educationDescriptionLabel = document.createElement("label");
    setAttributes(educationDescriptionLabel, {"for": "education_description" + addEducationCount});
    educationDescriptionLabel.textContent = "Description:";

    var educationDescription = document.createElement("input");
    setAttributes(educationDescription, {"type": "text", "name": "education_description" + addEducationCount,"class": "education-description", "id": "education_description" + addEducationCount, "maxlength": "100", "placeholder": "---Write something---"});

    knowledgeLi.appendChild(knowledgeLabel);
    knowledgeLi.appendChild(knowledge);
    knowledgeLi.appendChild(spanValidity0);

    knowledgeTypeLi.appendChild(knowledgeTypeLabel);
    knowledgeTypeLi.appendChild(knowledgeType);
    knowledgeTypeLi.appendChild(spanValidity1);
    knowledgeTypeLi.appendChild(divForSchoolTypeSelect);

    knowledgeDateLi.appendChild(startYearLabel);
    knowledgeDateLi.appendChild(startYear);
    knowledgeDateLi.appendChild(spanValidity3);
    knowledgeDateLi.appendChild(endYearLabel);
    knowledgeDateLi.appendChild(endYear);
    knowledgeDateLi.appendChild(spanValidity4);    

    knowledgeDescriptionLi.appendChild(educationDescriptionLabel);
    knowledgeDescriptionLi.appendChild(educationDescription);


    educationUl.appendChild(knowledgeLi);
    educationUl.appendChild(knowledgeTypeLi);
    educationUl.appendChild(knowledgeDateLi);
    educationUl.appendChild(knowledgeDescriptionLi);

    newSection.appendChild(educationUl);

    //document.getElementById("myform").appendChild(newSection);
    place.parentNode.insertBefore(newSection, place.nextSibling);
    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

});


window.onload = document.getElementById("deleteEducation").addEventListener("click", function() {
    console.log("You clicked deleteEducation");
    if(addEducationCount != 0 ){
        var deleteSection = document.getElementById("education" + addEducationCount);
        var previousSection = addEducationCount-1;
        var scrollSection = document.getElementById("education" + previousSection);
        console.log("education"+addEducationCount+" deleted")
        addEducationCount -=1;
        deleteSection.classList.add("deleted_element");
        const timer = setTimeout(console.log("Timer start"), 1000)
        setTimeout(function(){
           deleteSection.remove();
           scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }, 300);
        setTimeout(()=> {
            clearTimeout();
        }, 1);
    }else{
        console.log("all additional education records deleted");
        var scrollSection = document.getElementById("education-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        //showLogMsg("all additional education records deleted");
    }
});

window.onload = document.getElementById("addjob").addEventListener("click", function() {
    if(addExperienceCount == JOB_LIMIT){
        console.log("Too much experience records (LIMIT IS " + JOB_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addjob");
    if(document.getElementById("experience" + addExperienceCount) == null){
        var place = document.getElementById("education-buttons");
    }else{
        var place = document.getElementById("experience" + addExperienceCount);
    }
    addExperienceCount = addExperienceCount +1;

    var newSection = document.createElement("section");
    newSection.setAttribute("id", "experience" + addExperienceCount);
    newSection.setAttribute("class", "experience added_element");

    console.log("experience"+addExperienceCount+" added")

    var experienceUl = document.createElement("ul");
    var jobLi = document.createElement("li");
    var jobDateLi = document.createElement("li");

    var jobLabel = document.createElement("label");
    setAttributes(jobLabel,{"for": "job_name"+addExperienceCount});
    jobLabel.textContent = "Job:";

    var job = document.createElement("input");
    setAttributes(job, {"type": "text", "name": "job_name" + addExperienceCount, "id": "job_name" + addExperienceCount, "minlength": "1", "maxlength": "40"});
    job.required = true;

    var spanValidity0 = createSpanValidity();

    var startYearJobLabel = document.createElement("label");
    setAttributes(startYearJobLabel, {"for": "start_date_job" + addExperienceCount});
    startYearJobLabel.textContent = "From:";

    var startYearJob = document.createElement("input");
    setAttributes(startYearJob, {"type": "date", "name": "start_date_job" + addExperienceCount, "id": "start_date_job" + addExperienceCount, "min": "1900-01-01", "max": today(), "value": today()});
    startYearJob.required = true;

    var spanValidity1 = createSpanValidity();

    var endYearJobLabel = document.createElement("label");
    setAttributes(endYearJobLabel, {"for": "end_date_job" + addExperienceCount});
    endYearJobLabel.textContent = "To:";

    var endYearJob = document.createElement("input");
    setAttributes(endYearJob, {"type": "date", "name": "end_date_job" + addExperienceCount, "id": "end_date_job" + addExperienceCount, "min": "1900-01-01", "max": today(), "value": today()});
    endYearJob.required = true;

    var spanValidity2 = createSpanValidity();

    jobLi.appendChild(jobLabel);
    jobLi.appendChild(job);
    jobLi.appendChild(spanValidity0);

    jobDateLi.appendChild(startYearJobLabel);
    jobDateLi.appendChild(startYearJob);
    jobDateLi.appendChild(spanValidity1);

    jobDateLi.appendChild(endYearJobLabel);
    jobDateLi.appendChild(endYearJob);
    jobDateLi.appendChild(spanValidity2);

    experienceUl.appendChild(jobLi);
    experienceUl.appendChild(jobDateLi);

    newSection.appendChild(experienceUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);
    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
});

window.onload = document.getElementById("deletejob").addEventListener("click", function() {
        console.log("You clicked deleteJob");
        if(document.getElementById("experience" + addExperienceCount) == null){
            var scrollSection = document.getElementById("experience-buttons");
            scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            console.log("all experience records deleted");
            //showLogMsg("all jobs records deleted");
            return;
        }
        var deleteSection = document.getElementById("experience" + addExperienceCount);
        var previousSection = addExperienceCount-1;
        if(previousSection!=-1){var scrollSection = document.getElementById("experience" + previousSection);}
        else{var scrollSection = document.getElementById("experience-buttons");}
        deleteSection.classList.add("deleted_element");
        console.log("experience"+addExperienceCount+" deleted")
        const timer = setTimeout(console.log("Timer start"), 1000)
        setTimeout(function(){
           deleteSection.remove();
           scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }, 300);
        setTimeout(()=> {
            clearTimeout();
        }, 1);
        if(addExperienceCount >= 0 ){
            addExperienceCount -=1;
        };
});


window.onload = document.getElementById("addskill").addEventListener("click", function() {
    if(addSkillCount == SKILL_LIMIT){
        console.log("Too much skill records (LIMIT IS " + SKILL_LIMIT + " )");
        //showLogMsg("Too much skill records");
        return;
    }
    console.log("You clicked addskill");
    if(document.getElementById("skill" + addSkillCount) == null){
        console.log(1);
        var place = document.getElementById("experience-buttons");
    }else{
        var place = document.getElementById("skill" + addSkillCount);
    }
    addSkillCount = addSkillCount +1;

    var newSection = document.createElement("section");
    newSection.setAttribute("id", "skill" + addSkillCount);
    newSection.setAttribute("class", "skill added_element");

    console.log("skill"+addSkillCount+" added");

    var skillUl = document.createElement("ul");
    var skillNameLi = document.createElement("li");
    var skillLevelli = document.createElement("li");

    var skillNameLabel = document.createElement("label")
    skillNameLabel.setAttribute("for", "skill_name" + addSkillCount);
    skillNameLabel.textContent = "Skill:"

    var skillName = document.createElement("input")
    setAttributes(skillName, {"type": "text", "name": "skill_name" + addSkillCount, "id": "skill_name" + addSkillCount, "minlength": "1", "maxlength": "25"});
    skillName.required = true;

    var spanValidity0 = createSpanValidity();

    var skillLevelLabel = document.createElement("label");
    skillLevelLabel.setAttribute("for", "skill_level" + addSkillCount);

    var skillLevel = document.createElement("input");
    setAttributes(skillLevel, {"type": "range","id": "skill_level" + addSkillCount, "name": "skill_level" + addSkillCount, "min": "1", "max": "5", "value": "3", "step": "1"});

    var skillLevelValue = document.createElement("p");
    skillLevelValue.setAttribute("id", "skill-level-value" + addSkillCount);
    skillLevelValue.textContent = "Medium"

    skillUl.appendChild(skillNameLi);
    skillUl.appendChild(skillLevelli);

    skillNameLi.appendChild(skillNameLabel);
    skillNameLi.appendChild(skillName);
    skillNameLi.appendChild(spanValidity0);

    skillLevelli.appendChild(skillLevelLabel);
    skillLevelli.appendChild(skillLevel);
    skillLevelli.appendChild(skillLevelValue);

    newSection.appendChild(skillUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);
    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    

});

window.onload = document.getElementById("deleteskill").addEventListener("click", function() {
    console.log("You clicked deleteskill");
    if(document.getElementById("skill" + addSkillCount) == null){
        var scrollSection = document.getElementById("skill-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        console.log("all skill records deleted");
        //showLogMsg("all skill records deleted");
        return;
    }
    var deleteSection = document.getElementById("skill" + addSkillCount);
    var previousSection = addSkillCount-1;
    if(previousSection!=-1){var scrollSection = document.getElementById("skill" + previousSection);}
    else{var scrollSection = document.getElementById("skill-buttons");}
    deleteSection.classList.add("deleted_element");
    console.log("skill"+addSkillCount+" deleted")
    const timer = setTimeout(console.log("Timer start"), 1000)
    setTimeout(function(){
       deleteSection.remove();
       scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 300);
    setTimeout(()=> {
        clearTimeout();
    }, 1);

    if(addSkillCount >= 0 ){
        addSkillCount -=1;
    };
});

window.onload = document.getElementById("addhobby").addEventListener("click", function() {
    if(addHobbyCount == HOBBY_LIMIT){
        console.log("Too much hobby records (LIMIT IS " + HOBBY_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addhobby");
    if(document.getElementById("hobby" + addHobbyCount) == null){
        var place = document.getElementById("skill-buttons");
    }else{
        var place = document.getElementById("hobby" + addHobbyCount);
    }
    addHobbyCount = addHobbyCount +1;

    var newSection = document.createElement("section");
    newSection.setAttribute("id", "hobby" + addHobbyCount);
    newSection.setAttribute("class", "hobby added_element");

    console.log("hobby"+addHobbyCount+" added")

    var hobbyUl = document.createElement("ul");
    var hobbyLi = document.createElement("li");

    var hobbyLabel = document.createElement("label");
    setAttributes(hobbyLabel, {"for": "hobby_name" + addHobbyCount});
    hobbyLabel.textContent = "Hobby:"

    var hobby = document.createElement("input");
    setAttributes(hobby, {"type": "text", "name": "hobby_name" + addHobbyCount, "id": "hobby_name" + addHobbyCount, "minlength": "1", "maxlength": "25"});
    hobby.required = true;

    var spanValidity0 = createSpanValidity();

    hobbyUl.appendChild(hobbyLi);

    hobbyLi.appendChild(hobbyLabel);
    hobbyLi.appendChild(hobby);
    hobbyLi.appendChild(spanValidity0);

    newSection.appendChild(hobbyUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);
    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });


})

window.onload = document.getElementById("deletehobby").addEventListener("click", function() {
    console.log("You clicked deletehobby");
    if(document.getElementById("hobby" + addHobbyCount) == null){
        var scrollSection = document.getElementById("hobby-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        console.log("all hobby records deleted");
        //showLogMsg("all hobby records deleted");
        return;
    }

    var deleteSection = document.getElementById("hobby" + addHobbyCount);
    var previousSection = addHobbyCount-1;
    if(previousSection!=-1){var scrollSection = document.getElementById("hobby" + previousSection);}
    else{var scrollSection = document.getElementById("hobby-buttons");}
    deleteSection.classList.add("deleted_element");
    console.log("hobby"+addHobbyCount+" deleted")
    const timer = setTimeout(console.log("Timer start"), 1000)
    setTimeout(function(){
       deleteSection.remove();
       scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 300);
    setTimeout(()=> {
        clearTimeout();
    }, 1);
    if(addHobbyCount >= 0 ){
        addHobbyCount -=1;
    };
});

window.onload = document.getElementById("addlink").addEventListener("click", function() {
    if(addLinkCount == LINK_LIMIT){
        console.log("Too much link records (LIMIT IS " + LINK_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addlink");
    if(document.getElementById("link" + addLinkCount) == null){
        var place = document.getElementById("hobby-buttons");
    }else{
        var place = document.getElementById("link" + addLinkCount);
    }
    addLinkCount = addLinkCount +1;

    var newSection = document.createElement("section");
    newSection.setAttribute("id", "link" + addLinkCount);
    newSection.setAttribute("class", "link added_element");

    console.log("link"+addLinkCount+" added")

    var linkUl = document.createElement("ul");
    var linkUrlLi = document.createElement("li");
    var linkNameLi = document.createElement("li");

    var linkUrlLabel = document.createElement("label");
    setAttributes(linkUrlLabel, {"for": "link_url" + addLinkCount});
    linkUrlLabel.textContent = "Link(URL):"

    var linkUrl = document.createElement("input");
    setAttributes(linkUrl, {"type": "text", "name": "link_url" + addLinkCount, "id": "link_url" + addLinkCount, "placeholder": "https://pl.linkedin.com/in/(profile)", "pattern": "https://.*", "maxlength": "100"});
    linkUrl.required = true;

    var spanValidity0 = createSpanValidity();

    var linkNameLabel = document.createElement("label");
    setAttributes(linkNameLabel, {"for": "link_name" + addLinkCount});
    linkNameLabel.textContent = "Display as:"

    var linkName = document.createElement("input");
    setAttributes(linkName, {"type": "text", "name": "link_name" + addLinkCount, "id": "link_name" + addLinkCount, "placeholder": "linkedin",  "minlength": "1"});    
    linkName.required = true;

    var spanValidity1 = createSpanValidity();

    linkUl.appendChild(linkUrlLi);
    linkUl.appendChild(linkNameLi);

    linkUrlLi.appendChild(linkUrlLabel);
    linkUrlLi.appendChild(linkUrl);
    linkUrlLi.appendChild(spanValidity0);

    linkNameLi.appendChild(linkNameLabel);
    linkNameLi.appendChild(linkName);
    linkNameLi.appendChild(spanValidity1);


    newSection.appendChild(linkUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);
    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

})

window.onload = document.getElementById("deletelink").addEventListener("click", function() {
    console.log("You clicked deletelink");
    if(document.getElementById("link" + addLinkCount) == null){
        var scrollSection = document.getElementById("link-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        console.log("all link records deleted");
        //showLogMsg("all link records deleted");
        return;
    }

    var deleteSection = document.getElementById("link" + addLinkCount);
    var previousSection = addLinkCount-1;
    if(previousSection!=-1){var scrollSection = document.getElementById("link" + previousSection);}
    else{var scrollSection = document.getElementById("link-buttons");}
    deleteSection.classList.add("deleted_element");
    console.log("link"+addLinkCount+" deleted")
    const timer = setTimeout(console.log("Timer start"), 1000)
    setTimeout(function(){
       deleteSection.remove();
       scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 300);
    setTimeout(()=> {
        clearTimeout();
    }, 1);
    if(addLinkCount >= 0 ){
        addLinkCount -=1;
    };
});