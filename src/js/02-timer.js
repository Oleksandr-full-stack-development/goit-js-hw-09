import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';



const refs = {
  startButton: document.querySelector("button[data-start]"),
  days: document.querySelector('[data-days]'),
	hours: document.querySelector('[data-hours]'),
	minutes: document.querySelector('[data-minutes]'),
	seconds: document.querySelector('[data-seconds]'),
}

let timerId = null;
let selectedTime = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      
      clearInterval(timerId);
      console.log(selectedDates[0]);
      selectedTime = selectedDates[0].getTime();

      if (selectedTime < options.defaultDate.getTime())
      {
        refs.startButton.setAttribute('disabled',true);
        Notiflix.Report.failure('Wrong', 'Please choose a date in the future', 'Choose a date');
        
      } else {
        refs.startButton.removeAttribute('disabled');
        
      }
      
    },
  };

flatpickr("#datetime-picker", options);

refs.startButton.addEventListener('click', timer);
 
function timer () {
    refs.startButton.setAttribute('disabled',true);
    const startTime = selectedTime;
    timerId = setInterval (() => {
        const currentTime = Date.now();
        const deltaTime =startTime - currentTime;
        const timeInvert = convertMs(deltaTime);
        console.log(timeInvert);
        
        if (selectedTime <= Date.now()) {
          clearInterval(timerId)
        } else (updateClock(timeInvert))
    },1000);
}

function pad(value) {
  return String(value).padStart(2,'0');
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

  function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
  }