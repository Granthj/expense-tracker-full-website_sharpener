const Expense = require('../Models/expenseSchema');
const User = require('../Models/signupSchema');

const postExpense = async(req,res)=>{

    try{
        const {expenseAmount,category,description} = req.body;

        if(!expenseAmount || !category || !description){
            return res.status(400).json({message:'All fields are required'});
        }
        const userId = req.userId;
        console.log(userId,'userID is from user connected!');
        const user = await User.findByPk(userId);
        // console.log(user.totalExpense, typeof user.totalExpense);
        // console.log(expenseAmount, typeof expenseAmount);
        user.totalExpense = Number(user.totalExpense) + Number(expenseAmount);
        await user.save();

        const expense = await Expense.create({expenseAmount:expenseAmount,category:category,description:description,UserId:userId});

        res.status(201).json([expense]);
    }
    catch(err){
        return res.status(500).send('Something wrong');
    }
}
const getExpense = async(req,res)=>{

    try{
        const expense = await Expense.findAll({
            where:{
                UserId:req.userId
            }
        });

        res.status(200).json(expense);
    }
    catch(err){
        return res.status(500).send('Something wrong');
    }
}

module.exports = {
    postExpense,
    getExpense
}