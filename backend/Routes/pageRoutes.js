const express = require('express');
const router = express.Router();
const userAuthenticate = require('../Utils/authorization')
const path = require('path');

// Sign-Up page route
router.get('/sign-up',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend/views/signup.html'));
})
//login page route
router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend/views/login.html'));
})
//expense page route
router.get('/expense',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend/views/expense.html'));
})
router.get('/payment',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend/views/payment.html'));
})


router.post('/password',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend/views/getOtp.html'));
})
module.exports = router;



