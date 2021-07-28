import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate  } from './helpers/validate';
import { showInputErrow, removeInputError} from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notifications';



const {form, inputPassword, inputEmail} = UI;
const inputs = [inputEmail, inputPassword];


//event
form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();
});

inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

///handlers
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
        form.reset();
        //show success notyfy
        notify({msg: 'Login success', className: 'alert-success'});
    } catch (err) {
        //show error notyfy
        notify({msg: 'Login faild', className: 'alert-danger'});
    }

    
}
setTimeout(() => notify({msg: 'Some notification 1', className: 'alert-danger'}), 1000);
setTimeout(() => notify({msg: 'Some notification 2', className: 'alert-warning'}), 2000);
setTimeout(() => notify({msg: 'Some notification 3', className: 'alert-primary'}), 3000);

