const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/dbConnection');

const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },

    PhoneNumber:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },

    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" }
},{
    tableName: 'user'
})
module.exports = { User }