import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import validate from './helpers/validate';
import { showInputErrow, removeInputError } from './views/form';
import { login, singUp } from './services/auth.service';
import { notify } from './views/notifications';
import getNews from './services/news.service';

const { form, inputPassword, inputEmail, formSingUp, singupEmail, singupPassword, singupNickname, singupFirstName, singupLastName, singupPhone, singupGenderOrientation, singupCountry, singupCity, singupDateOfBirth } = UI;
const inputsLogin = [inputEmail, inputPassword];
const inputsSingUp = [singupEmail, singupPassword, singupNickname, singupFirstName, singupLastName, singupPhone, singupGenderOrientation, singupCountry, singupCity, singupDateOfBirth];

// tabs
const tabsHandlerElems = document.querySelectorAll('[data-tabs-handler]');
const tabsFieldElems = document.querySelectorAll('[data-tabs-field]');

for (const tab of tabsHandlerElems) {
	tab.addEventListener('click', () => {
		tabsHandlerElems.forEach((item) => {
			if (tab === item) {
				item.classList.add('login-list__item_active');
			} else {
				item.classList.remove('login-list__item_active');
			}
		});
		tabsFieldElems.forEach((item) => {
			if (item.dataset.tabsField === tab.dataset.tabsHandler) {
				item.classList.remove('hidden');
			} else {
				item.classList.add('hidden');
			}
		});
	});
}

/// handlers
async function onSubmit(input) {
	const isValidForm = input.every((el) => {
		const isValidInput = validate(el);
		if (!isValidInput) {
			showInputErrow(el);
		}
		return isValidInput;
	});
	if (!isValidForm) return;
	try {
		await login(inputEmail.value, inputPassword.value);
		await getNews();
		form.reset();
		// show success notyfy
		notify({
			msg: 'Login success',
			className: 'alert-success',
		});
	} catch (err) {
		// show error notyfy
		notify({
			msg: 'Login faild',
			className: 'alert-danger',
		});
	}
}

async function onSubmitSingUp(input) {
	const isValidForm = input.every((el) => {
		const isValidInput = validate(el);
		if (!isValidInput) {
			showInputErrow(el);
		}
		return isValidInput;
	});
	if (!isValidForm) return;
	console.log(singupDateOfBirth.value);
	try {
		await singUp(singupEmail.value, singupPassword.value, singupNickname.value, singupFirstName.value, singupLastName.value, singupPhone.value, singupGenderOrientation.value, singupCountry.value, singupCity.value, singupDateOfBirth.value);
		// await getNews();
		formSingUp.reset();
		// show success notyfy
		notify({
			msg: 'Login success',
			className: 'alert-success',
		});
	} catch (err) {
		// show error notyfy
		notify({
			msg: 'Login faild',
			className: 'alert-danger',
		});
	}
}

// event
form.addEventListener('submit', (e) => {
	e.preventDefault();
	onSubmit(inputsLogin);
});

formSingUp.addEventListener('submit', (e) => {
	e.preventDefault();
	onSubmitSingUp(inputsSingUp);
});

inputsLogin.forEach((el) => el.addEventListener('focus', () => removeInputError(el)));