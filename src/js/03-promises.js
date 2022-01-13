// const form = document.querySelector('.form');
// let formData = {};


// form.addEventListener('input', onFormInput);
// form.addEventListener('submit', createPromise);

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// function onFormInput (e) {
//   formData[e.target.name] = e.target.value;
//   console.log(formData);
// }
import Notiflix from 'notiflix';

const refs = {
	form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmitClick);
let position = 0;

function onSubmitClick(e) {
	e.preventDefault();

	let delay = Number(e.currentTarget.elements.delay.value);
	const step = Number(e.currentTarget.elements.step.value);
	const amount = Number(e.currentTarget.elements.amount.value);

	setInterval(() => {
		if (position === amount) { return }

		position += 1;
		setTimeout(() => { delay += step; })

		createPromise(position, delay)
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
			});
	}, delay);
}

function createPromise(position, delay) {
	const promise = new Promise((resolve, reject) => {

		setInterval(() => {
			const shouldResolve = Math.random() > 0.3;

			if (shouldResolve) {
				resolve({ position, delay });
			}
			reject({ position, delay });
		}, delay);
	})
	return promise;
};