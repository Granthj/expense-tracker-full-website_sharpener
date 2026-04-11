
const handleForgotPassword = async (e) => {

    try {
        e.preventDefault();
        const email = e.target.email.value;
        console.log(email,'dfghj')
        const div = document.createElement('div');
        const h1 = document.createElement('h1');
        const verifyRes = await axios.post(
            'http://localhost:3000/api/password',
            { email }
        );
        if(!verifyRes){
            h1.textContent = 'Retry again something went wrong'
            div.appendChild(h1);
        }
        h1.textContent = 'Link is send to your email check'
        div.appendChild(h1);
    }
    catch(err){

        console.log(err.message);
    }
}
