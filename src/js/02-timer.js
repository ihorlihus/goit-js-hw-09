import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

const myInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.setAttribute('disabled', true);
const fp = flatpickr(myInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  intervalId: null,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() > 0) {
      startBtn.removeAttribute('disabled', true);
      startBtn.addEventListener('click', function showLostTime() {
        intervalId = setInterval(() => {
          const currentTime = Date.now();
          const time = selectedDates[0] - currentTime;
          const timeFofShow = convertMs(time);
          const timeNom = Number(time);
          days.textContent = addLeadingZero(timeFofShow.days);
          hours.textContent = addLeadingZero(timeFofShow.hours);
          minutes.textContent = addLeadingZero(timeFofShow.minutes);
          seconds.textContent = addLeadingZero(timeFofShow.seconds);
          startBtn.setAttribute('disabled', true);
          if (timeNom < 999) {
            stopTimerIfTimeUp();
          }
        }, 1000);
      });
    } else {
      Notify.warning('Please choose a date in the future');
    }
  },
});

function stopTimerIfTimeUp() {
  clearInterval(this.intervalId);
  Notify.info('Time is over!');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
