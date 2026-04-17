const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Note = db.define('Notes',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports = Note;