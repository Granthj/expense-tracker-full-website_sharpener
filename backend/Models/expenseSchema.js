const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Expense = db.define('Expenses',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    expenseAmount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Expense;