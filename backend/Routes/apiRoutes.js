const express = require('express');
const router = express.Router();
const signupController = require('../Controllers/signupController');
const loginController = require('../Controllers/loginController');
const expenseController = require('../Controllers/expenseController');

//sign-up controller
router.post('/sign-up',signupController)

//login controller
router.post('/login',loginController);

//expense controller
router.post('/expense',expenseController.postExpense);
router.get('/expense',expenseController.getExpense);

module.exports = router;