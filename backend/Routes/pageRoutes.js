const express = require('express');
const router = express.Router();

const path = require('path');

// Sign-Up page route
router.get('/sign-up',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend/views/signup.html'))
})

module.exports = router;



