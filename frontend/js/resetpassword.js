
const handleSubmit = async(e)=>{

    try{
        const password = e.target.password.value;
        const newPassword = e.target.newPassword.value;

        const res = axios.post('http://localhost:3000/api/password/forgotpassword',{
            password,
            newPassword
        });

        if(res){
            const div = document.getElementById('message');
            const h1 = document.createElement('h1');

            h1.textContent = 'Congratulation your password is changed try to login again'
            div.appendChild(h1);
        }
       
        
    }
    catch(err){
        console.log(err.message);
    }
}