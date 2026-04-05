const express = require('express');
const router = express.Router();

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

module.exports = router;



