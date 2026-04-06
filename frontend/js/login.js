const handleSubmit = async (e) => {

    try {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post('http://localhost:3000/api/login', 
            {
                email,
                password
            }
        );
        console.log(response);
        if(response.data.success){
            localStorage.setItem('token',response.data.token);
            alert('Log in successfully');
            window.location.href = "/expense"
        }
    }
    catch (err) {
        console.log(err.response)
        if (err.response && !err.response.data.success) {

            const errorExists = document.getElementById('alert');
            if(errorExists){
                errorExists.remove();
            }
            const emailDiv = document.getElementById('emailDiv');
            const inputEmail = document.getElementById('email');

            const passwordDiv = document.getElementById('passwordDiv');
            const inputPassword = document.getElementById('password');

            // const form = document.getElementById('form');

            const p = document.createElement('p');
            p.id = 'alert';

            if (err.response.data.emailError && !err.response.data.passwordError) {
                p.textContent = 'Email is not found';
                inputEmail.insertAdjacentElement('afterend', p);
                isFocus(inputEmail);
            }
            else {
                p.textContent = 'Password is not matched';
                inputPassword.insertAdjacentElement('afterend', p);
                isFocus(inputPassword);
            }
        }
    }
}

const isFocus = (tagValue)=>{

    tagValue.onfocus = ()=>{

        const alertError = document.getElementById('alert');
            if(alertError)
                alertError.remove();
    }

}
