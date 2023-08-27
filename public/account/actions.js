const deleteModal = document.querySelector('#delete_modal')
const showModalButton = document.querySelector('#show_delete_modal')
const hideModalButton = document.querySelector('#hide_modal')

showModalButton.addEventListener('click', ()=>{
    deleteModal.showModal();
})
hideModalButton.addEventListener('click', ()=>{
    deleteModal.close();
})
