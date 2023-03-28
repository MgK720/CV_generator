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

    var spanValidity = createSpanValidity();

    //<label for="knowledge-type">Type: </label>
   // <select name="knowledge-type" id="knowledge-type" onchange="schoolTypeShow()" required>
    //<option value="">--Choose an option--</option>
    //<option value="school">School</option>
   // <option value="course">Course</option>
    //</select>
    //<span class="validity"></span>


    var knowledgeTypeLabel = document.createElement("label");
    setAttributes(knowledgeTypeLabel, {"for": "knowledge-type" + addEducationCount});
    knowledgeTypeLabel.textContent = "Type:";

    var knowledgeType = document.createElement("select");
    setAttributes(knowledgeType, {"name": "knowledge-type" + addEducationCount, "id": "knowledge-type" + addEducationCount, "onchange": "schoolTypeShow(addEducationCount)", "required": "true"});

    var blankType = document.createElement("option");
    setAttributes(blankType,{"value": "one"});
    blankType.textContent = "--Choose an option--";

    var firstKnowledgeType = document.createElement("option");
    setAttributes(firstKnowledgeType,{"value": "school"});
    firstKnowledgeType.textContent = "School";

    var secondKnowledgeType = document.createElement("option");
    setAttributes(secondKnowledgeType,{"value": "course"});
    secondKnowledgeType.textContent = "Course";

    knowledgeType.appendChild(blankType);
    knowledgeType.appendChild(firstKnowledgeType);
    knowledgeType.appendChild(secondKnowledgeType);

    var spanValidity2 = createSpanValidity();




    newSection.appendChild(knowledgeLabel);
    newSection.appendChild(knowledge);
    newSection.appendChild(spanValidity);
    newSection.appendChild(knowledgeTypeLabel);
    newSection.appendChild(knowledgeType);
    newSection.appendChild(spanValidity2);

    //document.getElementById("myform").appendChild(newSection);
    place.parentNode.insertBefore(newSection, place.nextSibling);

});