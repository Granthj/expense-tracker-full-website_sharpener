const Expense = require('../Models/expenseSchema');
const User = require('../Models/signupSchema');

const getIsPremium = async(req,res)=>{

    try{

        const premiumExpense = await Expense.findAll({
            attributes:['expenseAmount'],
            include:[
                {
                    model:User,
                    attributes:['name'],
                    where:{
                        isPremium:true
                    }
                }
            ]
        });
        res.status(200).json(premiumExpense);
    }
    catch(err){
        res.status(500).json({message:"Something goes wrong"});


    }
}

module.exports = getIsPremium;