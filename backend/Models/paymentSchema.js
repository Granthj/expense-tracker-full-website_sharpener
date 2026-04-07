const db = require('../Utils/db');
const { DataTypes } = require('sequelize');


const Payment = db.define('Payments',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    orderId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    paymentSessionId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    orderAmount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    orderCurrency:{
        type:DataTypes.STRING(10),
        allowNull:false,
        defaultValue:'INR'
    },
    paymentStatus:{
        type:DataTypes.ENUM('Pending','Success','Failure'),
        allowNull:false,
        defaultValue:'Pending',
    }
},
{
    tableName:'payments',
    timestamps:true
}
);
module.exports = Payment;