const otpGenerator = require('otp-generator');
const sendMail = require('../Services/nodeMailer');

const sendOtp = async(req,res)=>{
    
    try{

        const {email} = req.body;

        if(!email){
            res.status(400).json({message:"Email not found"});
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await sendMail(email, 'OTP Verification', otp);

        res.status(200).json({
            message: 'OTP sent successfully',
        });


    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to send email',
        });
    }
}

module.exports = sendOtp;