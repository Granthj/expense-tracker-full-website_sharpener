
const handleSubmit = async(e)=>{

    try{

        e.preventDefault();
        const email = e.target.email.value;
        
        
        const mainDiv = document.getElementById('otp');
        const res = axios.post('http://localhost:3000/api/password',{
            email
        });
        const getOtp = document.getElementById('button');
        
        
        // const emailSubmitbtn = document.createElement('button');
        
        
        if(res){
            const input = document.createElement('input');
            input.textContent = 'enter otp';
            const btn = document.createElement('button');
            btn.textContent = 'verify otp';

            btn.addEventListener('click',async()=>{
                const otp = input.value;
                const verifyRes = await axios.post(
                    'http://localhost:3000/api/password/forgotpassword',
                    { email, otp }
                );
            });
            mainDiv.appendChild(input);
            mainDiv.appendChild(btn);
        }
    }
    catch(err){
        console.log(err.message);
    }
}