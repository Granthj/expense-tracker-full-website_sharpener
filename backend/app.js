const db = require('./Utils/db');
const path = require('path');
const apiRoutes = require('./Routes/apiRoutes');
const pageRoutes = require('./Routes/pageRoutes');
const auth = require('./Utils/authorization');
const User = require('./Models/signupSchema');
const ForgotPasswordRequest = require('./Models/forgotPasswordRequestSchema');
const Expense = require('./Models/expenseSchema');

const express = require('express');
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname,"../frontend")));

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'View','index.html'));
// })
// app.use(auth);
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

app.use('/api',apiRoutes);
app.use('/',pageRoutes);

db.sync().then(()=>{
    app.listen(3000,()=>{
        console.log('Connected to server 3000');
    });
});