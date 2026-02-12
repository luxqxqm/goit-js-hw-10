import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const startBtn = document.querySelector('button[data-start]')
const input = document.querySelector('#datetime-picker')


const dayEl = document.querySelector('span[data-days]')
const hourEl = document.querySelector('span[data-hours]')
const minuteEl = document.querySelector('span[data-minutes]')
const secondEl = document.querySelector('span[data-seconds]')

let userSelectedDate; // змінна для збереження дати користувача


startBtn.disabled = true
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > Date.now()) {
            userSelectedDate = selectedDates[0];
            startBtn.disabled = false;
        }
        else {
            
            startBtn.disabled = true
            iziToast.show({
                message: 'Please choose a date in the future',
                messageColor: "black",
                color:"red"
});
        }        
        
    },
};

flatpickr(input, options)


startBtn.addEventListener('click', clickEvent)
let timerID;


function clickEvent() {
    timerID = setInterval(() => {
     const ms = userSelectedDate - Date.now()
        if (ms <= 0) {
            onTick({ days: "00", hours: '00', minutes: '00', seconds: '00' })
            clearInterval(timerID)
                input.disabled = false
                return
            }
            const miliSec = convertMs(ms)
            onTick(miliSec)
        }, 1000);   
    startBtn.disabled = true
    input.disabled = true
    }
    

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}





function pad(value){
    return String(value).padStart(2, "0")
}
    





    function onTick({ days, hours, minutes, seconds }) {
    dayEl.textContent = `${days}`
    hourEl.textContent = `${hours}`
    minuteEl.textContent = `${minutes}`
    secondEl.textContent = `${seconds}`
}