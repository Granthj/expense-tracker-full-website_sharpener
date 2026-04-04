const handleSubmit = async (e) => {

    try {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post('http://localhost:3000/api/login', {
            email,
            password
        });
    }
    catch (err) {
        if (err.response && err.response.data) {

            const emailDiv = document.getElementById('emailDiv');
            const inputEmail = document.getElementById('email');

            const passwordDiv = document.getElementById('passwordDiv');
            const inputPassword = document.getElementById('password');

            const form = document.getElementById('form');

            const p = document.createElement('p');
            p.id = 'alert';

            if (err.response.data.emailError && !err.response.data.passwordError) {
                p.textContent = 'Email is not found';
                inputEmail.insertAdjacentElement('afterend', p);
                isFocus(inputEmail);
            }
            else if (err.response.data.passwordError && !err.response.data.emailError) {
                p.textContent = 'Password is not matched';
                inputPassword.insertAdjacentElement('afterend', p);
                isFocus(inputPassword);
            }
            else {
                p.textContent = 'Email and Password is wrong';
                form.appendChild(p);
                isFocus(form);
            }
        }
    }
}

const isFocus = (tagValue)=>{

    tagValue.isFocus('focus',()=>{

        const alertError = document.getElementById('alert');
            if(alertError)
                alertError.remove();
    })

}
