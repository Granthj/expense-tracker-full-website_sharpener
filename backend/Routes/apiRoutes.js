const express = require('express');
const router = express.Router();
const signupController = require('../Controllers/signupController');
const loginController = require('../Controllers/loginController');
const expenseController = require('../Controllers/expenseController');
const paymentController = require('../Controllers/paymentController');
const premiumController = require('../Controllers/premiumController');
const resetpassword = require('../Controllers/resetPassword');
const userAuthenticate = require('../Utils/authorization');

//sign-up controller
router.post('/sign-up',signupController)

//login controller
router.post('/login',loginController);

//expense controller
router.post('/expense',userAuthenticate,expenseController.postExpense);
router.get('/expense',userAuthenticate,expenseController.getExpense);
router.delete('/delete-expense/:id',userAuthenticate,expenseController.deleteExpense);
router.post('/create-category',expenseController.categoryWithAiGen);
//payment controller
router.post('/pay',userAuthenticate,paymentController.processPayment);
router.get('/payment-status/:orderId',paymentController.paymentStatus);
//premium controller
router.get('/premium',userAuthenticate,premiumController);
router.post('/password',resetpassword.changePassword);
router.post('/password/forgotpassword',resetpassword.linkToChangePassword);

module.exports = router;