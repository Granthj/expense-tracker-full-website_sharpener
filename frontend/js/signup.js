
const handleSubmit = async (e) => {

    try{

        e.preventDefault();
    
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        const response = await axios.post('http://localhost:3000/api/sign-up', {
            name,
            email,
            password
        });
        console.log(response);
    }
    catch(err){
        if(err.response){
            const p = document.createElement('p');
            // const emailDiv = document.getElementById('emailDiv');
            const inputEmail = document.getElementById('email');
    
            p.textContent = err.response.data.message;
            p.id = 'alert';
            inputEmail.insertAdjacentElement('afterend',p);
    
            
            inputEmail.addEventListener('focus',()=>{
                const alertError = document.getElementById('alert');
                if(alertError)
                    alertError.remove();
            })
        }
        else{
            console.log(err);
        }
    }
}