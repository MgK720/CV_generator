
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'CP5k2gRabvc', 
        playerVars: {},
        events: {}
    });
}

// const dropdownbtn = document.querySelector('#dropdownbtn');
// const dropdown_content = document.querySelector('#dropdown_content')
// dropdownbtn.addEventListener('click', ()=>{
//     dropdown_content.style.display = 'block';
// })

const deleteModal = document.querySelector('#delete_modal')
const showModalButton = document.querySelector('#show_delete_modal')
const hideModalButton = document.querySelector('#hide_modal')

showModalButton.addEventListener('click', ()=>{
    deleteModal.showModal();
})
hideModalButton.addEventListener('click', ()=>{
    deleteModal.close();
})
