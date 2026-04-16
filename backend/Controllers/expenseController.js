const Expense = require('../Models/expenseSchema');
const User = require('../Models/signupSchema');
const generateResponse = require('../Services/gemini_api');
const sequelize = require('../Utils/db');

const postExpense = async(req,res)=>{

    const transaction = await sequelize.transaction();
    try{
        const {expenseAmount,category,description,income} = req.body;

        if(!expenseAmount || !category || !description){
            await transaction.rollback()
            return res.status(400).json({message:'All fields are required'});
        }
        const userId = req.userId;
        // console.log(userId,'userID is from user connected!');
        const user = await User.findByPk(userId,{transaction});
        user.totalExpense = Number(user.totalExpense) + Number(expenseAmount);
        await user.save({transaction:transaction});

        const expense = await Expense.create({expenseAmount:expenseAmount,category:category,description:description,UserId:userId},{transaction});
        await transaction.commit();
        res.status(201).json([expense]);
    }
    catch(err){
        await transaction.rollback();
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

    const transaction = await sequelize.transaction();
    try{
        const {id} = req.params;
        const user = await User.findByPk(req.userId,{transaction});
        const expense = await Expense.findByPk(id,{transaction});
        console.log(id)
        if(user.isPremium === true){

            user.totalExpense = Number(user.totalExpense) - Number(expense.expenseAmount);
            if(user.totalExpense <= 0){
                user.totalExpense = 0;
            }
            await user.save({transaction});
        }
        await expense.destroy({transaction});
        await transaction.commit();
        res.status(200).json({message:'Delete is done'});
    }
    catch(err){
        await transaction.rollback();
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