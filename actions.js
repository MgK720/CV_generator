function setAttributes(attrib, values){
    for(var key in values){
        attrib.setAttribute(key,values[key]);
    }
}


function schoolTypeShow(addEducationCount) {
    console.log(addEducationCount);
    for(var x = 0; x<=addEducationCount;x+=1){
        var knowledge = document.getElementById("knowledge-type" + x).value;
        if (knowledge == "school") {
            document.getElementById("school-type-select" + x).style.display = "inline-block";
        }
        else{
            document.getElementById("school-type-select" + x).style.display = "none";
    }
}
};
function createSpanValidity(){
    var spanValidity = document.createElement("span");
    spanValidity.setAttribute("class","validity");
    return spanValidity;
}

var addEducationCount = 0;
//Naprawic zeby dzialalo zawsze
window.onload = document.getElementById("addEducation").addEventListener("click", function() {
    console.log("You clicked me");

    var place = document.getElementById("education" + addEducationCount);
    addEducationCount = addEducationCount +1;


    var newSection = document.createElement("section")
    newSection.setAttribute("id", "education" + addEducationCount);
    newSection.setAttribute("class", "education");

    //Tutaj musi sie zrobic caly form education
    var knowledgeLabel = document.createElement("label");
    setAttributes(knowledgeLabel, {"for": "school" + addEducationCount})
    knowledgeLabel.textContent = "Knowledge:";

    var knowledge = document.createElement("INPUT");
    setAttributes(knowledge, {"type": "text", "name": "school" + addEducationCount, "id" : "school" + addEducationCount, 
    "class" : "school", "minlength" : "1", "maxlength" : "45", "required": "true"});

    var spanValidity0 = createSpanValidity();


    
    var knowledgeTypeLabel = document.createElement("label");
    setAttributes(knowledgeTypeLabel, {"for": "knowledge-type" + addEducationCount});
    knowledgeTypeLabel.textContent = "Type:";

    var knowledgeType = document.createElement("select");
    setAttributes(knowledgeType, {"name": "knowledge-type" + addEducationCount, "id": "knowledge-type" + addEducationCount, "onchange": "schoolTypeShow(addEducationCount)", "required": "true"});

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
    setAttributes(schoolType, {"name": "school-type" + addEducationCount, "id": "school-type" + addEducationCount, "required": "true"});


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




    newSection.appendChild(knowledgeLabel);
    newSection.appendChild(knowledge);
    newSection.appendChild(spanValidity0);
    newSection.appendChild(knowledgeTypeLabel);
    newSection.appendChild(knowledgeType);
    newSection.appendChild(spanValidity1);
    newSection.appendChild(divForSchoolTypeSelect);

    //document.getElementById("myform").appendChild(newSection);
    place.parentNode.insertBefore(newSection, place.nextSibling);

});