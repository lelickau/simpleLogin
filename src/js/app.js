import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputErrow, removeInputError} from './views/form';



const {form, inputPassword, inputEmail} = UI;
const inputs = [inputEmail, inputPassword];


//event
form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();
});

inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

///handlers
function onSubmit() {
    const isValidForm = inputs.every((el) => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputErrow(el);
        }
        return isValidInput;
    });
    console.log(isValidForm);
}