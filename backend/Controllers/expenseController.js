const Expense = require('../Models/expenseSchema');
const User = require('../Models/signupSchema');
const generateResponse = require('../Services/gemini_api');

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
const deleteExpense = async(req,res)=>{

    try{
        const {id} = req.params;
        const user = await User.findByPk(req.userId);
        const expense = await Expense.findByPk(id);
        console.log(id)
        if(user.isPremium === true){

            user.totalExpense = Number(user.totalExpense) - Number(expense.expenseAmount);
            if(user.totalExpense <= 0){
                user.totalExpense = 0;
            }
            await user.save();
        }
        await expense.destroy();

        res.status(200).json({message:'Delete is done'});
    }
    catch(err){
        return res.status(500).send('Something wrong');
    }
}
const categoryWithAiGen = async(req,res)=>{

    try{
        const {description} = req.body;
        const response = await generateResponse(description);
        console.log(response,'ai data');
        if(!response){
            return res.status(400).json({message:"Give a correct description or name",response:response});
        }
        res.status(200).json({message:'All good',response:response});

    }
    catch(err){
        console.log(err,'full')
        return res.status(500).send('Something wrong',err.message);
    }
}
module.exports = {
    postExpense,
    getExpense,
    deleteExpense,
    categoryWithAiGen
}