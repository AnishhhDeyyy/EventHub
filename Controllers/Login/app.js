const bcrypt = require('bcrypt');
const { User } = require('../../Models/User/app');
const { where } = require('sequelize');

const login = async (req,res) => {
    try{
        const { email,password } = req.body;
        const isUserExists = await User.findOne({where:{email:email}});
        if(!isUserExists){
            return res.status(400).json({message: 'User not Exists'});
        }
        const userPassword = isUserExists.password;
        const changedPassword = await bcrypt.compare(userPassword,password);
        if(changedPassword){
            res.status(200).json({message: 'Login Successfully'})
        }else{
            res.status(400).json({message: 'Incorrect Username or Password'})
        }
     }catch(err){
        console.log("Login Error",err);
        
    }
}

module.exports = { login }