window.onload = ()=>{
    const skillLevelDivsClassNames = ['vlow', 'low', 'medium', 'high', 'vhigh'];
    const skillLevels = document.querySelectorAll('.levelValue');
    const levelBar = document.querySelectorAll('.level_bar'); 
    for(let i =0; i<skillLevels.length; i++){
        let SkillLevelValue = parseInt(skillLevels[i].innerText);
        for(let j = 0; j < SkillLevelValue; j++){ 
            levelBar[i].children[j].classList.add(skillLevelDivsClassNames[j])
        } 
    }
}