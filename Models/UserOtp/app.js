const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/dbConnection');

const UserOtp = sequelize.define('Userotp',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    otp_type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email_otp:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_otp:{
        type: DataTypes.STRING,
        allowNull: false
    },
    expires_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
},{
    tableName: 'usersotp'
});
module.exports = { UserOtp }