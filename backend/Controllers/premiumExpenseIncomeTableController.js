const User = require('../Models/signupSchema');
const Expense = require('../Models/expenseSchema');
const Income = require('../Models/incomeSchema');
const {Op} = require('sequelize');

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(),1);
const startOfNextMonth = new Date(now.getFullYear(),now.getMonth()+1,1);

const monthlyTable = async(req,res)=>{

    try{
        const user = await User.findOne({
            where:{
                id:req.userId
            }
        });
        if(!user.isPremium){
            return res.status(403).json({message:'User is not authorized'});
        }
        const expense = await Expense.findAll({
            where:{
                UserId:req.userId,
                date:{
                    [Op.gte]:startOfMonth,
                    [Op.lt]:startOfNextMonth
                }
            },
            attributes:['date','description','expenseAmount','category']
        });
        const totalExpense = await Expense.sum('expenseAmount',{
            where:{
                UserId:req.userId,
                date:{
                    [Op.gte]:startOfMonth,
                    [Op.lt]:startOfNextMonth
                }
            }
        });
        const currentMonth = now.getMonth()+1;
        const currentYear = now.getFullYear();
        const incomeDesc = await Income.findOne({
            where:{
                UserId:req.userId,
                month:currentMonth,
                year:currentYear
            }
        });
        const totalIncome = await Income.sum('amount',{
            where:{
                UserId:req.userId,
                month:currentMonth,
                year:currentYear
            }
        });
        const finalIncome = totalIncome || 0;
        const savings = finalIncome - totalExpense;
        // if(!income){
        //     return res.status(404).json({message:'No income'});
        // }
        const monthAndDate = now.toLocaleString('en-IN',{
            month:'long',
            year:'numeric'
        });
        res.status(200).json({
            message:'All Good',
            data:expense,expense:totalExpense,
            income:finalIncome,
            incomeDesc:incomeDesc,
            savings:savings,
            monthAndDate:monthAndDate
        });
    }
    catch(err){
        return res.status(500).json({message:'Something went wrong'});
    }
}

// const yearlyReport = async(req,res)=>{

//     try{
//         const user = await User.findOne({
//             where:{
//                 id:req.userId,
//             }
//         });
//         if(user.isPremium === 0){
//             return res.status(403).json({message:'User is not authorized'});
//         }
//         const expense = await Expense.sum({
//             where:{
//                 UserId:req.userId,
//                 date:{
//                     [Op.gte]:startOfMonth,
//                     [Op.lt]:startOfNextMonth
//                 }
//             },
//             attributes:[]

//         })

//     }
// }
module.exports = {
    monthlyTable

}