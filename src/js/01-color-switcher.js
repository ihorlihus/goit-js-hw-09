const startButtonsEl = document.querySelector('button[data-start]');
const stopButtonsEl = document.querySelector('button[data-stop]');

startButtonsEl.addEventListener('click', createBgColor);
stopButtonsEl.addEventListener('click', stopColorChange);
stopButtonsEl.setAttribute('disabled', true);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function checkActive() {
    if (createBgColor) {
        startButtonsEl.setAttribute('disabled', true);
    }
};

function createBgColor() {
        timerId = setInterval(() => {
        const randomColor = getRandomHexColor();
        document.body.style.backgroundColor = randomColor;
    }, 1000);
    checkActive();
    stopButtonsEl.removeAttribute('disabled', true);
};

function stopColorChange() {
    startButtonsEl.removeAttribute('disabled', true);
    stopButtonsEl.setAttribute('disabled', true);
    clearInterval(timerId);
    console.log('Stoped')
};