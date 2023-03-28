function setAttributes(attrib, values){
    for(var key in values){
        attrib.setAttribute(key,values[key]);
    }
}


function schoolTypeShow() {
    var knowledge = document.getElementById("knowledge-type").value;
    if (knowledge == "school") {
        document.getElementById("school-type-select").style.display = "inline-block";
    }
    else{
        document.getElementById("school-type-select").style.display = "none";
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

    

    newSection.appendChild(knowledgeLabel);
    newSection.appendChild(knowledge);
    newSection.appendChild(spanValidity);


    //document.getElementById("myform").appendChild(newSection);
    place.parentNode.insertBefore(newSection, place.nextSibling);

});