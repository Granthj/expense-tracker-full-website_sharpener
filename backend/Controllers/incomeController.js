const Income = require('../Models/incomeSchema');
const User = require('../Models/signupSchema');
const postIncome = async (req, res) => {

    const { amount, description } = req.body;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const monthString = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const monthName = monthString[currentMonth - 1];
    const localDate = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];
    // console.log(typeof(amount),description,typeof(currentMonth),typeof(currentYear),req.userId);
    try {
        const incomeData = await Income.create({
            amount: amount,
            description: description,
            date:localDate,
            month: monthName,
            
            year: currentYear,
            UserId: req.userId
        });

        if (!incomeData) {
            return res.status(400).json({ message: 'Income not created' });
        }
        res.status(200).json({ message: 'income created', data: incomeData });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const getIncome = async (req, res) => {

    try {

        const incomeData = await Income.findAll({
            where: {
                UserId: req.userId
            },
            order: [
                ['month', 'DESC'],
                ['year', 'DESC']
            ]
        });
        res.status(200).json({ data: incomeData });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
const deleteIncome = async (req, res) => {

    try {
        const id = req.params.id;

        const income = await Income.findOne({
            where: {
                id: id,
            }
        });
        await income.destroy();
        res.status(200).json({ message: 'Income deleted' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });

    }
}
module.exports = {
    postIncome,
    getIncome,
    deleteIncome
}