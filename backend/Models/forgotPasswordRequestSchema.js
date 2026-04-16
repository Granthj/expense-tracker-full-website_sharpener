const db = require('../Utils/db');
const { DataTypes } = require('sequelize');
// const UUID = require('uuid')

const ForgotPasswordRequest = db.define('ForgotPassword',{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = ForgotPasswordRequest;