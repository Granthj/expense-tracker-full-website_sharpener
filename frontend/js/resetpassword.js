
const handleSubmit = async (e) => {

    try {
        e.preventDefault();
        const password = e.target.password.value;
        const newPassword = e.target.newPassword.value;

        const div = document.getElementById('message');
        if (password !== newPassword) {

            const errorDiv = document.getElementById('passwordError');
            errorDiv.textContent = 'Password does not match confirm password';
            errorDiv.classList.add('show');
            const input = document.getElementById('newPassword');
            input.insertAdjacentElement("afterend", errorDiv);
            return;
        }
        else{

            const errorDiv = document.getElementById('passwordError');
            errorDiv.classList.remove('show');
            errorDiv.innerHTML = ''
        }
        const id = new URLSearchParams(window.location.search).get('id');
        console.log(password, 'passpasspass');
        const res = await axios.post(`http://localhost:3000/api/password/forgotpassword`, {
            id,
            password,
            newPassword
        });
        e.target.password.value = '';
        e.target.newPassword.value = '';
        console.log(res);
        if (res.data) {
            const h1 = document.createElement('h1');

            h1.textContent = 'Congratulation your password is changed try to login again'
            div.appendChild(h1);
            setTimeout(() => {
                div.innerHTML = '';
                // history.replaceState(null, '', '/login');
                window.location.replace('/login');
            }, 2000);
        }


    }
    catch (err) {
        console.log(err.message);
    }
}