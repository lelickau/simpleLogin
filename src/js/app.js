import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import validate from './helpers/validate';
import { showInputErrow, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notifications';
import getNews from './services/news.service';

const { form, inputPassword, inputEmail } = UI;
const inputs = [inputEmail, inputPassword];

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
async function onSubmit() {
	const isValidForm = inputs.every((el) => {
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

// event
form.addEventListener('submit', (e) => {
	e.preventDefault();
	onSubmit();
});

inputs.forEach((el) => el.addEventListener('focus', () => removeInputError(el)));