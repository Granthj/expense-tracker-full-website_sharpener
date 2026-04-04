
const handleSubmit = async (e) => {

    try{

        e.preventDefault();
    
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        const response = await axios.post('http://localhost:3000/expenses', {
            name,
            email,
            password
        });
    
        console.log(response);
    }
    catch(err){
        console.log(err);
    }
}