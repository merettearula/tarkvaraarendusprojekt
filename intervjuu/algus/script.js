let fullName, education, profession, hobbies, saveBtn;

fullName = document.querySelector('#name');
education = document.querySelector('#education');
profession = document.querySelector('#profession');
hobbies = document.querySelector('#hobbies');
saveBtn = document.querySelector('#save');
loadBtn = document.querySelector('#load');
deleteBtn = document.querySelector('#delete');

function saveLocal() {
    localStorage.setItem('Nimi', fullName.value);
    localStorage.setItem('Haridus', education.value);
    localStorage.setItem('Amet', profession.value);
    localStorage.setItem('Hobid', hobbies.value); // jaavad alles kui brauser kinni
    console.log('Andmed salvestati');

    sessionStorage.setItem('Nimi', fullName.value);
    sessionStorage.setItem('Haridus', education.value);
    sessionStorage.setItem('Amet', profession.value); // kustuvad ara
    sessionStorage.setItem('Hobid', hobbies.value);

    let data = {
        name: fullName.value,
        education: education.value,
        profession: profession.value,
        hobbies: hobbies.value
    }

    localStorage.setItem('personData', JSON.stringify(data));

    // document.cookie = "profession=" + profession.value;
}

function loadLocal() {
    fullName.value = localStorage.getItem('Nimi');
    education.value = localStorage.getItem('Haridus');
    profession.value = localStorage.getItem('Amet');
    hobbies.value = localStorage.getItem('Hobid');

    console.log(sessionStorage.getItem('Nimi'), 
    sessionStorage.getItem('Haridus'), 
    sessionStorage.getItem('Amet'),
    sessionStorage.getItem('Hobid'));

    const personData = JSON.parse(localStorage.getItem('personData'));

    document.querySelector('#textContainer').innerHTML = 
    personData.name + " " + personData.education + " " + personData.profession + " " + personData.hobbies;
}

function deleteLocal() {
    localStorage.removeItem('Nimi');
    localStorage.removeItem('Haridus');
    localStorage.removeItem('Amet');
    localStorage.removeItem('Hobid');
    localStorage.removeItem('personData');

    sessionStorage.removeItem('Nimi');
    sessionStorage.removeItem('Haridus');
    sessionStorage.removeItem('Amet');
    sessionStorage.removeItem('Hobid');
    sessionStorage.removeItem('personData');
}

saveBtn.addEventListener('click', saveLocal);
loadBtn.addEventListener('click', loadLocal);
deleteBtn.addEventListener('click', deleteLocal);
