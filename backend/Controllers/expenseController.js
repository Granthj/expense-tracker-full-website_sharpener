const Expense = require('../Models/expenseSchema');

const postExpense = async(req,res)=>{

    try{
        const {expenseAmount,category,description} = req.body;

        if(!expenseAmount || !category || !description){
            return res.status(400).json({message:'All fields are required'});
        }
        const expense = await Expense.create({expenseAmount:expenseAmount,category:category,description:description});

        res.status(201).json(expense);
    }
    catch(err){
        return res.status(500).send('Something wrong');
    }
}
const getExpense = async(req,res)=>{

    try{
        const expense = await Expense.findAll();

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