// Getting DOM from HTML
const time = document.querySelector('#time');
const greeting = document.querySelector('#greeting');
const name = document.querySelector('#name');
const focus = document.querySelector('#focus');
const changeTimeButton = document.querySelector('#changeTime');

var hour = new Date().getHours();
var timeFormat = '24';

// Set AM or PM
let amPm;
if (hour >= 12) {
    amPm = 'PM';
} else if (hour < 12) {
    amPm = 'AM';
}

// Change the time format
changeTimeButton.addEventListener('click', function () {
    if (hour >= 12) {
        // Set the 12 hour clock format
        hour = hour % 12 || 12;
        timeFormat = '12';
    } else {
        // Set the 24 hour clock format
        hour = new Date().getHours();
        timeFormat = '24';
    }
});


function showTime() {

    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    // Display the time
    time.innerHTML = `${addZeros(hour)}:${addZeros(min)}:${addZeros(sec)} <span id="small-text">${amPm}</span>`;

    if (timeFormat === '24') {
        document.getElementById('small-text').classList.add('hide');
        changeTimeButton.innerHTML = `<i class="fas fa-clock"></i> 12 hour format`;
    } else {
        changeTimeButton.innerHTML = `<i class="fas fa-clock"></i> 24 hour format`;
    }

    setInterval(showTime, 1000);
}

// Add zeros before the time for single digits
function addZeros(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

// Set the background and greetings depending on time
function setBackgroundAndGreeting() {
    var hour = new Date().getHours();
    if (hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('../Images/morning.jpg')";
        greeting.innerHTML = 'Good morning,';
        document.body.style.color = "#fff";
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('../Images/afternoon.jpg')";
        greeting.innerHTML = 'Good afteroon,';
    } else {
        // Night
        document.body.style.backgroundImage = "url('../Images/night.jpg')";
        greeting.innerHTML = 'Good evening,';
        document.body.style.color = "#fff";
    }
}

// Get the name from localStorage
function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = 'Enter your name';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Get the focus from localStorage
function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focus.textContent = 'Enter your focus';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set the name to localStorage
function setName(e) {
    // if key is pressed
    if (e.type === 'keypress') {
        // Enter key has keycode of 13
        if (e.keyCode == 13) {
            localStorage.setItem('name', e.target.textContent);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.textContent);
    }
}

// Set the focus to localStorage
function setFocus(e) {
    // if key is pressed
    if (e.type === 'keypress') {
        // Enter key has keycode of 13
        if (e.keyCode == 13) {
            localStorage.setItem('focus', e.target.textContent);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.textContent);
    }
}

// Adding event listeners
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


// Call the functions
showTime();
setBackgroundAndGreeting();
getName();
getFocus();