const express = require('express');
const router = express.Router();
const signupController = require('../Controllers/signupController');

//sign-up controller
router.post('/sign-up',signupController)


module.exports = router;