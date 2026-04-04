const User = require('../Models/signupSchema');

const signUp = async(req,res)=>{

    try{

       const {name,email,password} = req.body;

       const signupExists = await User.findOne({
        where:{
            email:email
        }
       });
       if(signupExists){
        return res.status(403).json({message:"email already exists",bool:true});
       }
       const signup = await User.create({
        name:name,
        email:email,
        password:password
       });
       res.status(201).json({message:"User created with email",bool:false}); 
    }
    catch(err){
        return res.status(500).send('something wrong while creating signup');
    }
}

module.exports = signUp;
