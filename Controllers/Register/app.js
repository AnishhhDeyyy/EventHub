const validator = require('validator');
const { User } = require('../../Models/User/app');
const bcrypt = require('bcrypt');
const register = async(req,res)=>{
    try{
        const { email,name,password,role, phone} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: 'Invalid Email Address'});
        }
        const checkPhoneNumber = await findPhoneNumber(phone); 
        if(!checkPhoneNumber){
            return res.status(400).json({message: 'Phone Number is not valid'});
        }
        const existingUser = await User.findOne({
            email:email
        });
        if(existingUser){
           return res.status(400).json({message: 'User already Exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);

    }catch(err){
        console.log("Err",err);
        res.status(500).json({message: "Registration Failed"});
    }
}

const findPhoneNumber = async(phone)=>{
    return validator.isMobilePhone(phone, 'any');
}