import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayEl = form.querySelector('[name=delay]');
const stepEl = form.querySelector('[name=step]');
const amountEl = form.querySelector('[name=amount]');

form.addEventListener('submit', event => {
  event.preventDefault();
  let deleyToNumber = Number(delayEl.value);
  const stepToNumber = Number(stepEl.value);
  console.log(deleyToNumber, stepToNumber);

  for (let i = 1; i <= amountEl.value; i += 1) {
    deleyToNumber += stepToNumber;
    createPromise(i, deleyToNumber)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
