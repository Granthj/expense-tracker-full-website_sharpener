const User = require('../Models/signupSchema');
const bcrypt = require('bcrypt');

const login = async(req,res)=>{

    try{
        const {email,password} = req.body;

        const login = await User.findOne({
            where:{
                email:email

            }
        });
        // console.log("type:", typeof login,login);
        
        if(login === null){
            // console.log(login,'loginnnn')
            return res.status(404).json({emailError:true,passwordError:false,message:"Email not found",success:false});
        }
        const hashedPassword = await bcrypt.compare(password,login.password);
        if(!hashedPassword){
            return res.status(403).json({emailError:false,passwordError:true,message:"Password not matched",success:false});
        }
        return res.status(200).json({emailError:false,passwordError:false,message:"All Good",success:true}); 
    }
    catch(err){
        return res.status(500).send('Something wrong');
    }
}

module.exports = login;