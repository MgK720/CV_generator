function schoolTypeShow() {
    var knowledge = document.getElementById("knowledge-type").value;
    if (knowledge == "school") {
        document.getElementById("school-type-select").style.display = "inline-block";
    }
    else{
        document.getElementById("school-type-select").style.display = "none";
    }
};
var addEducationCount = 0;
//Naprawic zeby dzialalo zawsze
window.onload = document.getElementById("addEducation").addEventListener("click", function() {
    console.log("You clicked me");

    var place = document.getElementById("education" + addEducationCount);
    addEducationCount = addEducationCount +1;


    var newSection = document.createElement("section")
    newSection.setAttribute("id", "education" + addEducationCount);

    //Tutaj musi sie zrobic caly form education
    var knowledge = document.createElement("INPUT");
    knowledge.setAttribute("type", "text");

    newSection.appendChild(knowledge);


    //document.getElementById("myform").appendChild(newSection);
    place.parentNode.insertBefore(newSection, place.nextSibling);

});