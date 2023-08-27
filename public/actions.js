const EDU_LIMIT = 5;
const JOB_LIMIT = 9;
const SKILL_LIMIT = 13;
const HOBBY_LIMIT = 7;
const LINK_LIMIT = 7;

//for update form all variables = tableDataCount
if(checkFormStatus() === 'update'){ //pamietac zeby ustawic ten atrybut w another js file (fetched in update template)
    educationDataFromDbCount = 1; //imported data from another js file (fetched in update template)
    experienceDataFromDbCount = 0;
    skillDataFromDbCount = 0;
    hobbyDataFromDbCount = 0;
    linkDataFromDbCount = 0;
}

window.addEventListener("DOMContentLoaded", (event) =>{
    if(checkFormStatus() === 'create' || checkFormStatus() === 'update'){
        //SchoolTypeShowOnRefresh();
        //SkillLevelOnRefresh();
        maxDate();
        //setDefaultDate();
    }
})

function maxDate(){
        const myEduDateInputFrom = document.getElementById("start_date_knowledge0");
        const myEduDateInputTo = document.getElementById("end_date_knowledge0");
        const myExpDateInputFrom = document.getElementById("start_date_job0");
        const myExpDateInputTo = document.getElementById("end_date_job0");


        myEduDateInputFrom.setAttribute("max",today());

        myEduDateInputTo.setAttribute("max",today());

        myExpDateInputFrom.setAttribute("max",today());

        myExpDateInputTo.setAttribute("max",today());

}

function setDefaultDate(){
    const myEduDateInputFrom = document.getElementById("start_date_knowledge0");
        const myEduDateInputTo = document.getElementById("end_date_knowledge0");
        const myExpDateInputFrom = document.getElementById("start_date_job0");
        const myExpDateInputTo = document.getElementById("end_date_job0");


        myEduDateInputFrom.setAttribute("value", today());
        myEduDateInputTo.setAttribute("value", today());

        myExpDateInputFrom.setAttribute("value", today());

        myExpDateInputTo.setAttribute("value", today());
}

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

window.onload = document.querySelector('#myimage').addEventListener('change', validateFile);

window.onload = document.getElementById("addEducation").addEventListener("click", function() {
    if(addEducationCount == EDU_LIMIT){
        console.log("Too much education records (LIMIT IS " + EDU_LIMIT  + " )");
        //showLogMsg("Too much education records");
        return;
    }
    console.log("You clicked addEducation");
    const place = document.getElementById("education" + addEducationCount);
    addEducationCount = addEducationCount +1;

    const newSection = createEducationSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

});

window.onload = document.getElementById("deleteEducation").addEventListener("click", deleteEducationSection);

window.onload = document.getElementById("addjob").addEventListener("click", function() {
    if(addExperienceCount == JOB_LIMIT){
        console.log("Too much experience records (LIMIT IS " + JOB_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addjob");
    let place = document.getElementById("education-buttons");
    if(document.getElementById("experience" + addExperienceCount) == null){
        console.log("my count"+addExperienceCount)
        place = document.getElementById("education-buttons");
    }else{
        place = document.getElementById("experience" + addExperienceCount);
    }
    addExperienceCount = addExperienceCount +1;

    newSection = createExperienceSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
});

window.onload = document.getElementById("deletejob").addEventListener("click", deleteExperienceSection);

window.onload = document.getElementById("addskill").addEventListener("click", function() {
    if(addSkillCount == SKILL_LIMIT){
        console.log("Too much skill records (LIMIT IS " + SKILL_LIMIT + " )");
        //showLogMsg("Too much skill records");
        return;
    }
    console.log("You clicked addskill");
    let place = document.getElementById("experience-buttons");
    if(document.getElementById("skill" + addSkillCount) == null){
        console.log(1);
        place = document.getElementById("experience-buttons");
    }else{
        place = document.getElementById("skill" + addSkillCount);
    }
    addSkillCount = addSkillCount +1;

    const newSection = createSkillSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
});

window.onload = document.getElementById("deleteskill").addEventListener("click", deleteSkillSection);

window.onload = document.getElementById("addhobby").addEventListener("click", function() {
    if(addHobbyCount == HOBBY_LIMIT){
        console.log("Too much hobby records (LIMIT IS " + HOBBY_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addhobby");
    let place = document.getElementById("skill-buttons");
    if(document.getElementById("hobby" + addHobbyCount) == null){
        place = document.getElementById("skill-buttons");
    }else{
        place = document.getElementById("hobby" + addHobbyCount);
    }
    addHobbyCount = addHobbyCount +1;

    const newSection = createHobbySection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });


})

window.onload = document.getElementById("deletehobby").addEventListener("click", deleteHobbySection);

window.onload = document.getElementById("addlink").addEventListener("click", function() {
    if(addLinkCount == LINK_LIMIT){
        console.log("Too much link records (LIMIT IS " + LINK_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addlink");
    let place = document.getElementById("hobby-buttons");
    if(document.getElementById("link" + addLinkCount) == null){
        place = document.getElementById("hobby-buttons");
    }else{
        place = document.getElementById("link" + addLinkCount);
    }
    addLinkCount = addLinkCount +1;

    const newSection = createLinkSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

})

window.onload = document.getElementById("deletelink").addEventListener("click", deleteLinkSection);

$( document ).on("input","input[type='range']", function(event){
    const idOfClickedElement = event.target.id;
    const valueOfClickedElement = event.target.value;

    const idNumber = idOfClickedElement.charAt(idOfClickedElement.length-1);

    const idOfParagraph = "skill-level-value" + idNumber;

    const idOfParagraphSelector = $("p[id='" + idOfParagraph + "']");

    SkillLevelParagraphSet(valueOfClickedElement, idOfParagraphSelector);

})

function SkillLevelOnRefresh(){
    const skillLevelValue = document.getElementById("skill_level0").value;
    const paragraphSelector = $("p[id='skill-level-value0']");
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

function SchoolTypeShowOnRefresh(){
    //Miałem problem z sessionStorage tego elementu podczas odswiezania strony zostawała wybrana przed refreshem wartość
    //nie działało to prawidłowo z funkcją schoolTypeShow, dlatego teraz po refreshu jesli uzytkownik wybral opcje "school"
    //to prawidłowo wyświetli sie select wyboru school_type
    if(document.getElementById("knowledge_type0").value == 1){
        document.getElementById("school_type0").required = true
        document.getElementById("school-type-select0").style.display = "flex";
    }
}

function schoolTypeShowOnAdded(index){
    if(document.getElementById(`knowledge_type${index}`).value == 1){
        const event = new Event("change");
        document.getElementById(`knowledge_type${index}`).dispatchEvent(event);
    }
}

function levelParagraphOnAdded(index){
    //const event = new Event("oninput");
    skillLevelValue = $(`#skill_level${index}`).val();
    paragraphSelector = $(`#skill-level-value${index}`);
    SkillLevelParagraphSet(skillLevelValue,paragraphSelector )
    //document.getElementById(`skill-level-value${index}`).dispatchEvent(event);
}