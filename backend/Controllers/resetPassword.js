const User = require('../Models/signupSchema');
const ForgotPassword = require('../Models/forgotPasswordRequestSchema');
const sendEmail = require('../Services/nodeMailer');
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const changePassword = async(req,res)=>{

    try{

        const {email} = req.body;
        
        const user = await User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({message:'User not found with this email'});
        }
        const forgotPassword = await ForgotPassword.create({
            id:uuidv4(),
            userId:user.id,
            isActive:true
        });
        console.log('in change',forgotPassword)
        const resetLink = `http://localhost:3000/password/resetpassword/${forgotPassword.id}`;
    
        await sendEmail(email,'Forgot Password Link',resetLink);
        res.status(201).json({message:'Link send'});
    }
    catch(err){
        return res.status(500).json({message:'Something went wrong'});
    }
}

const linkToChangePassword = async(req,res)=>{

    try{

        const {id} = req.params;
        // const {password,newPassword} = req.body;

        const passChange = await ForgotPassword.findOne({where:{id:id}});

        if(!passChange || !passChange.isActive){
            return res.status(404).json({message:"Link is expired or not found"});
        }
        const user = await User.findOne({where:{id:passChange.userId}});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        await user.save();
    }
    catch(err){
        return res.status(500).json({message:'Something went wrong'});
    }
}

module.exports = {
    changePassword,
    linkToChangePassword
};