const User = require('../Models/signupSchema');
const Expense = require('../Models/expenseSchema');
const Income = require('../Models/incomeSchema');
const Note = require('../Models/notesSchema');
const { Op } = require('sequelize');

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

const monthlyTable = async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        });
        if (!user.isPremium) {
            return res.status(403).json({ message: 'User is not authorized' });
        }
        const expense = await Expense.findAll({
            where: {
                UserId: req.userId,
                date: {
                    [Op.gte]: startOfMonth,
                    [Op.lt]: startOfNextMonth
                }
            },
            attributes: ['date', 'description', 'expenseAmount', 'category', 'date']
        });
        const totalExpense = await Expense.sum('expenseAmount', {
            where: {
                UserId: req.userId,
                date: {
                    [Op.gte]: startOfMonth,
                    [Op.lt]: startOfNextMonth
                }
            }
        });
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        const monthString = ["January", "Febuary", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthName = monthString[currentMonth - 1];

        const income = await Income.findAll({
            where: {
                UserId: req.userId,
                month: monthName,
                year: currentYear
            },
            attributes: ['date', 'description', 'amount', 'year', 'month']
        });
        // console.log(income,'asdfghjklkjhgfdsdfghjkl');
        const totalIncome = await Income.sum('amount', {
            where: {
                UserId: req.userId,
                month: monthName,
                year: currentYear
            }

        });
        const finalIncome = totalIncome || 0;
        let savings = finalIncome - totalExpense;
        if (savings <= 0) {
            savings = 0;
        }
        // if(!income){
        //     return res.status(404).json({message:'No income'});
        // }
        const expensesData = (expense || []).map((e) => ({
            date: e.date,
            type: 'Expense',
            amount: e.expenseAmount,
            description: e.description,
            category: e.category
        }));
        const incomeData = (income || []).map((i) => ({
            date: i.date,
            type: 'Income',
            amount: i.amount,
            description: i.description
        }));

        const combinedData = [...expensesData, ...incomeData];

        const groupedData = {};
        combinedData.forEach(item => {
            if (!groupedData[item.date]) {
                groupedData[item.date] = [];
            }
            groupedData[item.date].push(item);
        })
        const monthAndDate = now.toLocaleString('en-IN', {
            month: 'long',
            year: 'numeric'
        });
        res.status(200).json({
            message: 'All Good',
            data: groupedData,
            totalExpense: totalExpense,
            totalIncome: finalIncome,
            savings: savings,
            monthAndDate: monthAndDate
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const yearlyTable = async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                id: req.userId,
            }
        });
        if (user.isPremium === 0) {
            return res.status(403).json({ message: 'User is not authorized' });
        }
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        const monthString = ["January", "Febuary", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthName = monthString[currentMonth - 1];

        const totalExpense = await Expense.sum('expenseAmount', {
            where: {
                UserId: req.userId,
                date: {
                    [Op.gte]: startOfMonth,
                    [Op.lt]: startOfNextMonth
                }
            }
        });
        const totalIncome = await Income.sum('amount', {
            where: {
                UserId: req.userId,
                month: monthName,
                year: currentYear
            }
        });
        let savings = totalIncome - totalExpense;
        if (savings <= 0) {
            savings = 0;
        }
        res.status(200).json({
            message: 'All Good',
            month: monthName,
            totalExpense: totalExpense,
            totalIncome: totalIncome,
            savings: savings,
            title: "Yearly Report"

        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
const notesTable = async (req, res) => {

    try {
        const currentYear = now.getFullYear();
        const startOfYear = new Date(currentYear, 0, 1); 
        const endOfYear = new Date(currentYear + 1, 0, 1);
        const notes = await Note.findAll({
            where: {
                UserId: req.userId,
                date: {
                    [Op.gte]: startOfYear,
                    [Op.lt]: endOfYear
                }
            },
            order: [['date', 'ASC']]
        });
        const formattedDateNote = notes.map(note => {
            const d = new Date(note.date);

            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();

            return {
                ...note.toJSON(),
                date: `${day}/${month}/${year}`
            };
        });
        res.status(200).json({ message: 'Notes fetched successfully', notes: formattedDateNote });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
module.exports = {
    monthlyTable,
    yearlyTable,
    notesTable
}