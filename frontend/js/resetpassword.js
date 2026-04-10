
const handleSubmit = async(e)=>{

    try{

        const newPassword = e.target.value.password;

         const verifyRes = await axios.post(
            'http://localhost:3000/api/password/forgotpassword',
            { newPassword ,email}
        );
    }
    catch(err){
        console.log(err.message);
    }
}