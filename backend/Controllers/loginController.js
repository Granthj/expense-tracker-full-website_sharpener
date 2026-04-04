const User = require('../Models/signupSchema');

const login = async(req,res)=>{

    try{
        const {email,password} = req.body;

        const login = await User.findOne({
            where:{
                email:email

            }
        });
        if(!login){
            return res.status(404).json({emailError:true,passwordError:false,message:"Email not found",success:false});
        }
        if(password !== login.password){
            return res.status(403).json({emailError:false,passwordError:true,message:"Password not matched",success:false});
        }
        return res.status(200).json({emailError:false,passwordError:false,message:"All Good",success:true}); 
    }
    catch(err){
        return res.status(500).send('Something wrong');
    }
}

module.exports = login;