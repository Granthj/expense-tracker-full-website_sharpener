const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Income = db.define('Income',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    amount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    month:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
// },{
//         indexes:[
//             {
//                 unique:true,
//                 fields:['UserId','month','year']
//             }
//         ]
//     }
});
module.exports = Income;