//TODO W PRZYSZLOSCI OGRANICZENIE WYSWIETLANIA DANYCH NP TYLKO PO 20 NA STRONE I PRZYCISK NEXT - *** DONE ***
const disableButton = (buttonId) =>{
    buttonId.disabled = true;
    buttonId.classList.add('button_disable');
}

const enableButton = (buttonId) => {
    buttonId.disabled = false;
    buttonId.classList.remove('button_disable');
}


let pageNumber = 1;
let maxPageVisible = Infinity;
let searchTerm = 0;

const h1 = document.querySelector('h1');
const form = document.querySelector('form');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
disableButton(previous);
disableButton(next);

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    pageNumber = 1;
    maxPageVisible = Infinity;
    searchTerm = form.elements.verb_like.value;

    await fetchData(searchTerm, pageNumber);

    form.elements.verb_like.value = '';
})
previous.addEventListener('click', async ()=> {
    h1.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    if(pageNumber > 1){
        pageNumber--;
        await fetchData(searchTerm, pageNumber);
    }
})
next.addEventListener('click', async ()=>{
    h1.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    pageNumber++;
    await fetchData(searchTerm, pageNumber);
})


const makeCards = (data) => {
    for (let row of data) {
        makeCard(row);    
    }
}

const fetchData = async (verb, page)=>{
    if(page == 1){
        disableButton(previous);
    }
    try{
        if(page == maxPageVisible){//if second time we go to the last page
            disableButton(next);
            pageNumber--;
            return;
        }else{ // if there is no maxPageVisible yet - try to find it on next page
            const nextPage = page + 1;
            const config_next = { params: { verb_like: verb, pageNumber: nextPage} }
            const res_next = await axios.get(`/talentfinder/search`, config_next);
            if(res_next.data.length == 0){
                maxPageVisible = nextPage;
                disableButton(next);
            }else{
                enableButton(next);
            }
        }
        const config = { params: { verb_like: verb, pageNumber: page} }
        const res = await axios.get(`/talentfinder/search`, config);
        if(res.data.length == 0 ){ // if there is completely no data for verb_like
            maxPageVisible = page;
            disableButton(next);
            pageNumber--;
            deleteCards();
            // if(pageNumber == 0){ //if there is completely no data for verb_like
            //     deleteCards();
            // }
            return;
        }
        else{
            if(page > 1){
                enableButton(previous);
            }
            deleteCards();
            console.log(page);
            makeCards(res.data);
        }
    }catch(e){
        console.log(e);
    }
}

const makeCard = (row) => {
    const place = document.querySelector('#all_records');

    const record = document.createElement('div')
    record.classList.add('record');

    const personaldataUl = document.createElement('ul');
    personaldataUl.classList.add('personaldata');


    const personaldataImgLi = document.createElement('li');
    personaldataImgLi.classList.add('image_element');
    const personaldataImg = document.createElement('img');
    personaldataImg.src = row.img_destination;
    personaldataImgLi.append(personaldataImg);

    const personaldataHrefsLi = document.createElement('li');

    const personaldataCvHrefParagraph = document.createElement('p');
    const personaldataCvHref = document.createElement('a');
    personaldataCvHref.href = `/cv/${row.cv_id}`;
    personaldataCvHref.innerText = `${row.firstname} ${row.lastname}`;
    personaldataCvHrefParagraph.append(personaldataCvHref);

    const personaldataTelHrefParagraph = document.createElement('p');
    const personaldataTelHref = document.createElement('a');
    personaldataTelHref.href= `tel:+${row.phone_country}${row.phone}`;
    personaldataTelHref.innerText = `+${row.phone_country} ${row.phone}`;
    personaldataTelHrefParagraph.append(personaldataTelHref);

    const personaldataMailHrefParagraph = document.createElement('p');
    const personaldataMailHref = document.createElement('a');
    personaldataMailHref.href = `mailto:${row.email}`;
    personaldataMailHref.innerText = `${row.email}`;
    personaldataMailHrefParagraph.append(personaldataMailHref);

    personaldataHrefsLi.append(personaldataCvHrefParagraph);
    personaldataHrefsLi.append(personaldataTelHrefParagraph);
    personaldataHrefsLi.append(personaldataMailHrefParagraph);

    personaldataUl.append(personaldataImgLi);
    personaldataUl.append(personaldataHrefsLi);

    const skillsUl = document.createElement('ul');
    skillsUl.classList.add('skills');


    const skillArrayLenght = row.skills.length;
    for(let i = 0;i<skillArrayLenght;i++){
        const skillLi = document.createElement('li');
        skillLi.innerText = row.skills[i];
        skillsUl.append(skillLi);
    }

    record.append(personaldataUl);
    record.append(skillsUl);
    record.classList.add('record_added');
    place.append(record);
}

const deleteCards = () =>{
    let records = document.querySelectorAll('.record');
    for(let i =0; i< records.length; i++){
        records[i].classList.add('record_deleted');
        records[i].remove();
    }
}

const makeBlank = ()=>{
    const place = document.querySelector('#all_records');

    const record = document.createElement('div')
    record.classList.add('record');

    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = 'No data Available';

    record.append(messageParagraph);

    setTimeout(() =>{
        place.append(record);
    }, 3000)
}
