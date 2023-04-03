var EDU_LIMIT = 5;
var JOB_LIMIT = 10;

var addEducationCount = 0;
var addExperienceCount = 0;

window.addEventListener("load", (event) => {
    maxDate();
  });


function setAttributes(attrib, values){
    for(var key in values){
        attrib.setAttribute(key,values[key]);
    }
}

function today(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    let currentDate = `${year}-0${month}-0${day}`;
    console.log(currentDate);
    return currentDate;

}
function maxDate(){
        var myEduDateInputFrom = document.getElementById("startyear0");
        var myEduDateInputTo = document.getElementById("endyear0");
        var myExpDateInputFrom = document.getElementById("startyear-job0");
        var myExpDateInputTo = document.getElementById("endyear-job0");


        myEduDateInputFrom.setAttribute("max",today());
        myEduDateInputFrom.setAttribute("value", today());

        myEduDateInputTo.setAttribute("max",today());
        myEduDateInputTo.setAttribute("value", today());

        myExpDateInputFrom.setAttribute("max",today());
        myExpDateInputFrom.setAttribute("value", today());

        myExpDateInputTo.setAttribute("max",today());
        myExpDateInputTo.setAttribute("value", today());

}

function isStartEduBeforeEnd(){
    for(var i; i<=addEducationCount; i++){
        var myStartDate = document.getElementById("startyear" + i);
        var myEndDate = document.getElementById("endyear" + i);
        var mySubmit = document.getElementById("submit");
        if(myEndDate < myStartDate){
            console.log("Startyear must be before Endyear");
            return 0;
        }else{
            mySubmit.disabled = false;
        }
    }
}


function schoolTypeShow(addEducationCount) {
    console.log(addEducationCount);
    for(var x = 0; x<=addEducationCount;x+=1){
        var knowledge = document.getElementById("knowledge-type" + x).value;
        if (knowledge == "school") {
            //inline-block
            document.getElementById("school-type" + x).required = true
            document.getElementById("school-type-select" + x).style.display = "flex";
        }
        else{
            document.getElementById("school-type" + x).required = false;
            document.getElementById("school-type" + x).value = "";
            document.getElementById("school-type-select" + x).style.display = "none";
            
    }
}
};
function createSpanValidity(){
    var spanValidity = document.createElement("span");
    spanValidity.setAttribute("class","validity");
    return spanValidity;
}


window.onload = document.getElementById("addEducation").addEventListener("click", function() {
    if(addEducationCount == EDU_LIMIT){
        console.log("Too much education records (LIMIT IS " + EDU_LIMIT + " )");
        return;
    }
    console.log("You clicked addEducation");
    var place = document.getElementById("education" + addEducationCount);
    addEducationCount = addEducationCount +1;

    var newSection = document.createElement("section");
    newSection.setAttribute("id", "education" + addEducationCount);
    newSection.setAttribute("class", "education");

    console.log("education"+addEducationCount+" added");

    var knowledgeLabel = document.createElement("label");
    setAttributes(knowledgeLabel, {"for": "school" + addEducationCount})
    knowledgeLabel.textContent = "Knowledge:";

    var knowledge = document.createElement("INPUT");
    setAttributes(knowledge, {"type": "text", "name": "school" + addEducationCount, "id" : "school" + addEducationCount, 
    "class" : "school", "minlength" : "1", "maxlength" : "45"});
    knowledge.required = true;

    var spanValidity0 = createSpanValidity();



    var knowledgeTypeLabel = document.createElement("label");
    setAttributes(knowledgeTypeLabel, {"for": "knowledge-type" + addEducationCount});
    knowledgeTypeLabel.textContent = "Type:";

    var knowledgeType = document.createElement("select");
    setAttributes(knowledgeType, {"name": "knowledge-type" + addEducationCount, "id": "knowledge-type" + addEducationCount, "onchange": "schoolTypeShow(addEducationCount)"});
    knowledgeType.required = true;

    var blankType0 = document.createElement("option");
    setAttributes(blankType0,{"value": ""});
    blankType0.textContent = "--Choose an option--";

    var firstKnowledgeType = document.createElement("option");
    setAttributes(firstKnowledgeType,{"value": "school"});
    firstKnowledgeType.textContent = "School";

    var secondKnowledgeType = document.createElement("option");
    setAttributes(secondKnowledgeType,{"value": "course"});
    secondKnowledgeType.textContent = "Course";

    knowledgeType.appendChild(blankType0);
    knowledgeType.appendChild(firstKnowledgeType);
    knowledgeType.appendChild(secondKnowledgeType);

    var spanValidity1 = createSpanValidity();



    var divForSchoolTypeSelect = document.createElement("div");
    setAttributes(divForSchoolTypeSelect, {"id": "school-type-select" + addEducationCount, "class": "school-type-select"});

    var schoolTypeLabel = document.createElement("label")
    setAttributes(schoolTypeLabel, {"for": "school-type" + addEducationCount});
    schoolTypeLabel.textContent = "SchoolType:";

    var schoolType = document.createElement("select")
    setAttributes(schoolType, {"name": "school-type" + addEducationCount, "id": "school-type" + addEducationCount});
    schoolType.required = true;


    var blankType1 = document.createElement("option");
    setAttributes(blankType1,{"value": ""});
    blankType1.textContent = "--Choose an option--";

    var firstSchoolType = document.createElement("option");
    setAttributes(firstSchoolType, {"value": "school"});
    firstSchoolType.textContent = "Primary";

    var secondSchoolType = document.createElement("option");
    setAttributes(secondSchoolType, {"value": "mid-school"});
    secondSchoolType.textContent = "MidSchool";

    var thirdSchoolType = document.createElement("option");
    setAttributes(thirdSchoolType, {"value": "high-school"});
    thirdSchoolType.textContent = "HighSchool";

    var spanValidity2 = createSpanValidity();

    schoolType.appendChild(blankType1);
    schoolType.appendChild(firstSchoolType);
    schoolType.appendChild(secondSchoolType);
    schoolType.appendChild(thirdSchoolType);

    divForSchoolTypeSelect.appendChild(schoolTypeLabel);
    divForSchoolTypeSelect.appendChild(schoolType);
    divForSchoolTypeSelect.appendChild(spanValidity2);



    var startYearLabel = document.createElement("label");
    setAttributes(startYearLabel, {"for": "startyear" + addEducationCount});
    startYearLabel.textContent = "From:";

    var startYear = document.createElement("input");
    //TODO walidacja dat (czy data zakonczenia jest pozniej niz data rozpoczecia) "max": today()
    setAttributes(startYear, {"type": "date", "name": "startyear" + addEducationCount, "id": "startyear" + addEducationCount, "min": "1900-01-01", "max": today(), "value": today()});
    startYear.required = true;

    var spanValidity3 = createSpanValidity();

    var endYearLabel = document.createElement("label");
    setAttributes(endYearLabel, {"for": "endyear" + addEducationCount});
    endYearLabel.textContent = "To:";

    var endYear = document.createElement("input");
    setAttributes(endYear, {"type": "date", "name": "endyear" + addEducationCount, "id": "endyear" + addEducationCount, "min": "1900-01-01", "max": today(), "value": today()});
    endYear.required = true;

    var spanValidity4 = createSpanValidity();



    var educationDescriptionLabel = document.createElement("label");
    setAttributes(educationDescriptionLabel, {"for": "education-description" + addEducationCount});
    educationDescriptionLabel.textContent = "Description:";

    var educationDescription = document.createElement("input");
    setAttributes(educationDescription, {"type": "text", "name": "education-description" + addEducationCount, "id": "education-description" + addEducationCount, "placeholder": "---Write something---"});




    newSection.appendChild(knowledgeLabel);
    newSection.appendChild(knowledge);
    newSection.appendChild(spanValidity0);
    newSection.appendChild(knowledgeTypeLabel);
    newSection.appendChild(knowledgeType);
    newSection.appendChild(spanValidity1);
    newSection.appendChild(divForSchoolTypeSelect);
    newSection.appendChild(startYearLabel);
    newSection.appendChild(startYear);
    newSection.appendChild(spanValidity3);
    newSection.appendChild(endYearLabel);
    newSection.appendChild(endYear);
    newSection.appendChild(spanValidity4);
    newSection.appendChild(educationDescriptionLabel);
    newSection.appendChild(educationDescription);

    //document.getElementById("myform").appendChild(newSection);
    place.parentNode.insertBefore(newSection, place.nextSibling);

});


window.onload = document.getElementById("deleteEducation").addEventListener("click", function() {
    console.log("You clicked deleteEducation");
    if(addEducationCount != 0 ){
        var deleteSection = document.getElementById("education" + addEducationCount);
        console.log("education"+addEducationCount+" deleted")
        addEducationCount -=1;
        deleteSection.remove();
    }else{
        console.log("all additional education records deleted");
    }
});

window.onload = document.getElementById("addjob").addEventListener("click", function() {
    if(addExperienceCount == JOB_LIMIT){
        console.log("Too much experience records (LIMIT IS " + JOB_LIMIT + " )");
        return;
    }
    console.log("You clicked addjob");
    if(document.getElementById("experience" + addExperienceCount) == null){
        var place = document.getElementById("education" + addEducationCount);
    }else{
        var place = document.getElementById("experience" + addExperienceCount);
    }
    addExperienceCount = addExperienceCount +1;

    var newSection = document.createElement("section");
    newSection.setAttribute("id", "experience" + addExperienceCount);
    newSection.setAttribute("class", "experience");
    console.log("experience"+addExperienceCount+" added")

    var jobLabel = document.createElement("label");
    setAttributes(jobLabel,{"for": "job"+addExperienceCount});
    jobLabel.textContent = "Job:";

    var job = document.createElement("input");
    setAttributes(job, {"type": "text", "name": "job" + addExperienceCount, "id": "job" + addExperienceCount, "minlength": "1", "maxlength": "40"});
    job.required = true;

    var spanValidity0 = createSpanValidity();

    var startYearJobLabel = document.createElement("label");
    setAttributes(startYearJobLabel, {"for": "startyear-job" + addExperienceCount});
    startYearJobLabel.textContent = "From:";

    var startYearJob = document.createElement("input");
    setAttributes(startYearJob, {"type": "date", "name": "startyear-job" + addExperienceCount, "id": "startyear-job" + addExperienceCount, "min": "1900-01-01", "max": today(), "value": today()});
    startYearJob.required = true;

    var spanValidity1 = createSpanValidity();

    var endYearJobLabel = document.createElement("label");
    setAttributes(endYearJobLabel, {"for": "endyear-job" + addExperienceCount});
    endYearJobLabel.textContent = "To:";

    var endYearJob = document.createElement("input");
    setAttributes(endYearJob, {"type": "date", "name": "endyear-job" + addExperienceCount, "id": "endyear-job" + addExperienceCount, "min": "1900-01-01", "max": today(), "value": today()});
    endYearJob.required = true;

    var spanValidity2 = createSpanValidity();


    newSection.appendChild(jobLabel);
    newSection.appendChild(job);
    newSection.appendChild(spanValidity0);

    newSection.appendChild(startYearJobLabel);
    newSection.appendChild(startYearJob);
    newSection.appendChild(spanValidity1);

    newSection.appendChild(endYearJobLabel);
    newSection.appendChild(endYearJob);
    newSection.appendChild(spanValidity2);

    place.parentNode.insertBefore(newSection, place.nextSibling);
});

window.onload = document.getElementById("deletejob").addEventListener("click", function() {
        console.log("You clicked deleteJob");
        if(document.getElementById("experience" + addExperienceCount) == null){
            console.log("all experience records deleted");
            return;
        }
        var deleteSection = document.getElementById("experience" + addExperienceCount);
        console.log("experience"+addExperienceCount+" deleted")
        deleteSection.remove();
        if(addExperienceCount >= 0 ){
            addExperienceCount -=1;
        };
});