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

const deleteModal = document.querySelector('#delete_modal')
const showModalButton = document.querySelector('#show_delete_modal')
const hideModalButton = document.querySelector('#hide_modal')

showModalButton.addEventListener('click', ()=>{
    deleteModal.showModal();
})
hideModalButton.addEventListener('click', ()=>{
    deleteModal.close();
})

// document.querySelector('#delete_cv_href').addEventListener('click', async(event)=>{
//     event.preventDefault();
//     link = document.querySelector('#delete_cv_href');
//     const id = link.href.slice(25, link.href.indexOf('d')-1); //wydzielenie id z atrybutu href;

//     await fetch(`/cv/${id}/delete`, {
//         method: 'DELETE',
//     }).then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     })

//     //return response.json()
// })