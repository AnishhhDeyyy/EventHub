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
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
      PhoneNumber:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp:{
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