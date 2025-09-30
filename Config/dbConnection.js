const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const dbConnection = async() => {
    try{
        await sequelize.authenticate();
        console.log("DB Connected");
        
    }catch(err){
        console.log("Err",err);
        
    }
}
module.exports = { dbConnection , sequelize }