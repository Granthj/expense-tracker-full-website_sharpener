const Expense = require('../Models/expenseSchema');
const User = require('../Models/signupSchema');

const getIsPremium = async(req,res)=>{

    try{

        const premiumExpense = await User.findAll({
            attributes:['name','totalExpense'],
            where:{
                isPremium:true
            }
        });
        res.status(200).json(premiumExpense);
    }
    catch(err){
        res.status(500).json({message:"Something goes wrong"});


    }
}

module.exports = getIsPremium;