const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
service:'gmail',
  host: "smtp.gamil.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = async(email,subject,otp)=>{
    try{

        const info = await transporter.sendMail({
           from: '"Expense-App" <yourbookingsatyourspace@gmail.com>', // sender address
           to: email, // list of recipients
           subject: subject, // subject line
           text: `Your otp is ${otp}`, // plain text body
           html: `<b>Your OTP is: ${otp}</b>`, // HTML body
        });    
    }
     catch (err) {
        console.error('Email error:', err);
    }
}

module.exports = mailOptions;