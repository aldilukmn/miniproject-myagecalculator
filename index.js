const calculateBtn = document.querySelector('.calculate');
const noInput = document.querySelector('.no-input');
const reset = document.querySelector('.reset');
const save = document.querySelector('.save');
const yourDate = document.getElementById('birthdate');
const years = document.getElementById('years');
const months = document.getElementById('months');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const calculate = () => {
    setInterval(() => {
        let birthDate = new Date(yourDate.value);

        if (birthDate == 'Invalid Date') {
            noInput.style.display = 'block';
            return;
        }

        noInput.style.display = 'none';

        // getTime : return the number of miliseconds since January 1, 1970
        let now = new Date();
        let ageInMs = now.getTime() - birthDate.getTime();
        let ageInS = ageInMs / 1000; // to seconds
        let ageInM = ageInS / 60; // to minutes
        let ageInH = ageInM / 60; // to hours
        let ageInD = ageInH / 24; // to days
        let ageInMo = ageInD / 30.4375 // to months
        let ageInY = ageInMo / 12 // to years 
        
        years.innerText = Math.floor(ageInY);
        months.innerText = Math.floor(ageInMo % 12);
        days.innerText = Math.floor(ageInD % 30.4375);
        hours.innerText = Math.floor(ageInH % 24);
        minutes.innerText = Math.floor(ageInM % 60);
        seconds.innerText = Math.floor(ageInS % 60);
    }, 1000)
}

// calculate
calculate();

// reset
reset.addEventListener('click', () => {
    yourDate.value = '';
    years.innerText = null
    months.innerText = null
    days.innerText = null
    hours.innerText = null
    minutes.innerText = null
    seconds.innerText = null

})

// save
save.addEventListener('click', () => {
    let yourBirthdateInfo = {
        "years" : null,
        "months" : null,
        "days" : null,
    }

    const yourBirthdate = [];
    const temp = yourDate.value.split('-');

    yourBirthdateInfo = {
        "years" : temp[0],
        "months" : temp[1],
        "days" : temp[2],
    }

    yourBirthdate.push(yourBirthdateInfo);

    localStorage.setItem('your_birth_date', JSON.stringify(yourBirthdate));
    alert('Birthdate saved successfully');
})

const loadBirthdate = () => {
    if (localStorage.getItem('your_birth_date') !== null) {
        const yourBirthdate = JSON.parse(localStorage.getItem('your_birth_date'));

        const { years, months, days } = yourBirthdate[0];

        yourDate.value = `${years}-${months}-${days}`;
    }
}

loadBirthdate();