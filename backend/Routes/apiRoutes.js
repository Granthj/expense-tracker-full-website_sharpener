const express = require('express');
const router = express.Router();
const signupController = require('../Controllers/signupController');
const loginController = require('../Controllers/loginController');

//sign-up controller
router.post('/sign-up',signupController)

//login controller
router.post('/login',loginController);

module.exports = router;