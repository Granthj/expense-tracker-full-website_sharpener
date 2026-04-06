const express = require('express');
const router = express.Router();
const signupController = require('../Controllers/signupController');
const loginController = require('../Controllers/loginController');
const expenseController = require('../Controllers/expenseController');
const userAuthenticate = require('../Utils/authorization');

//sign-up controller
router.post('/sign-up',signupController)

//login controller
router.post('/login',loginController);

//expense controller
router.post('/expense',userAuthenticate,expenseController.postExpense);
router.get('/expense',userAuthenticate,expenseController.getExpense);

module.exports = router;