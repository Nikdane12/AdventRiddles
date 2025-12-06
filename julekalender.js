let calender
let daysarray
let dayobj
let day
let lockbutton
let unlockstatus
let currentdate = new Date()
let currentlang

const startup = () => {
    // lockbutton = document.getElementById('unlock')
    unlockstatus = 'lock'
    unlockstatus = localStorage.getItem('kalanderlockstatus') ?? 'lock'
    localStorage.setItem('kalanderlockstatus', unlockstatus)
    // if (unlockstatus == 'unlock') {
    //     lockbutton.innerHTML = `🔓`
    // }
    // else {
    //     lockbutton.innerHTML = `🔒`
    // }
    daysarray = JSON.parse(localStorage.getItem('daysarray')) ?? []

    if (daysarray.length < 1) { createDays() }
    calender = document.getElementById('calender')

    for (var i = 0; i < 24; ++i) {
        const day = daysarray.find(x => x.position == i)
        const daycont = document.createElement('div')
        daycont.classList.add('daycont')
        daycont.setAttribute('id', day.day)
        let myanim = ''
        if (day.openstatus) { myanim = `origin${day.direction} ${day.direction} black` }
        let takeTreat = ''
        if (day.takenstatus) { takeTreat = 'taken' }
        let display = ''
        if (!day.openstatus) { display = 'hide' }
        daycont.innerHTML = `
        <div class="daybackground ${display}"></div>
        <img class="treat ${takeTreat} ${display}" src="./${day.treat}.png" onclick="eatTreat(${day.day})"/>
        <div class="day ${myanim}" onclick="openDoor(${day.day})"><p class="noSelect">${day.day}</p></div>`
        calender.appendChild(daycont)
    }    
    currentlang = localStorage.getItem('kalanderlangstatus') ?? 'EN'
    localStorage.setItem('kalanderlangstatus', currentlang)

    const mainTitle = document.getElementById('mainTitle')
    let mainTitleText
    if(currentlang == 'EN'){
        mainTitleText = "Advent calendar";
    } else {
        mainTitleText = "Adventskalender";
    }
    mainTitle.innerText = mainTitleText
}

const createDays = () => {
    let shufflednumbers = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
    for (var i = 0; i < 24; ++i) {
        dayobj = {
            day: i + 1,
            direction: getRandomDirection(),
            treat: getRandomTreat(),
            takenstatus: false,
            position: shufflednumbers[i],
            openstatus: false,
        }
        daysarray.push(dayobj)
    }
    let Julenatt = daysarray.find(x => x.day == 24)
    Julenatt.treat = 'julenatt'
    saveLocalStorage()
}

const saveLocalStorage = () => {
    localStorage.setItem('daysarray', JSON.stringify(daysarray))
    localStorage.setItem('kalanderlockstatus', unlockstatus)
    // localStorage.setItem('kalanderlangstatus', currentlang)
}

const getRandomDirection = () => {
    let directions = ['up', 'down', 'left', 'right']
    return directions[Math.floor(Math.random() * directions.length)]
}

const getRandomTreat = () => {
    let treats = ['kjeks', 'sjokolade', 'lakris', 'kakeman']
    return treats[Math.floor(Math.random() * treats.length)]
}

const shuffle = (array) => {
    var i = array.length, j = 0, temp
    while (i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

const eatTreat = (day) => {
    let lsdknc = daysarray.find(x => x.day == day)
    lsdknc.takenstatus = true
    const daycont = document.getElementById(day)
    const image = daycont.querySelector('.treat')
    image.classList.add('taken')
    openRiddle(day, currentlang);

    saveLocalStorage()
}

// const unlock = () => {
//     unlockstatus = unlockstatus == 'unlock' ? 'lock' : 'unlock'
//     if (unlockstatus == 'unlock') {
//         lockbutton.innerHTML = `🔓`
//     }
//     else {
//         lockbutton.innerHTML = `🔒`
//     }
//     saveLocalStorage()
// }

const openDoor = (day) => {
    if (unlockstatus == 'lock') {
        if (day > currentdate.getDate()) {
            dontOpenDoor(day);
        }
        else {
            actuallyopeningday(day)
        }
    }
    else {
        actuallyopeningday(day)
    }
}

const actuallyopeningday = (day) => {
    const dayData = daysarray.find(x => x.day == day)
    const daycont = document.getElementById(day)
    const cover = daycont.querySelector('.day')        
    const treatimage = daycont.querySelector('.treat')
    const background = daycont.querySelector('.daybackground')

    if (dayData.openstatus) {
        cover.classList.remove(dayData.direction)
        cover.classList.remove('black')
        treatimage.classList.add('hide')
        background.classList.add('hide')
        dayData.openstatus = false
    }
    else {    
        dayData.openstatus = true     
        cover.classList.add(dayData.direction)
        cover.classList.add(`origin${dayData.direction}`)
        cover.classList.add('black')
        treatimage.classList.remove('hide')
        background.classList.remove('hide')
    }

    saveLocalStorage()
}

const dontOpenDoor = (day) => {
    const dayData = daysarray.find(x => x.day == day);
    const daycont = document.getElementById(day);
    daycont.classList.add('shake');    
    setTimeout(() => {
        daycont.classList.remove('shake');
    }, 300);
}

const clearAdvents = () => {
    localStorage.removeItem('daysarray')
    window.location.reload()
}

const mainTextDE = "Adventskalender"
const mainTextEN = "Advent calendar"

const setLang = (lang) => {
    console.log(lang);
    
    const mainTitle = document.getElementById('mainTitle')
    let mainTitleText
    switch (lang) {
        case "EN":
            currentlang = "EN"
            mainTitleText = "Advent calendar";
            break;
        case "DE":
            currentlang = "DE"
            mainTitleText = "Adventskalender";

            break;
        default:
            console.log("ERROR SET LANG");
            break;
    }
    mainTitle.innerText = mainTitleText
    saveLocalStorage()
}

const toggleLang = () => {
    if(currentlang == "EN"){
        setLang("DE")
    } else {
        setLang("EN")
    }
}

// window.addEventListener('DOMContentLoaded', startup);

window.startup = startup;
window.clearAdvents = clearAdvents;
// window.unlock = unlock;
window.openDoor = openDoor;
window.eatTreat = eatTreat;
window.toggleLang = toggleLang;

window.addEventListener('keydown', (event) => {
  if (event.key === 'p') {
    window.print();
  }
})