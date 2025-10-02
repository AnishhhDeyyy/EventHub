const validator = require('validator');
const { User } = require('../../Models/User/app');
const bcrypt = require('bcrypt');
const { sendWelcomeEmail, sendEmailOtp } = require('../../Utils/Mailer/app');
const { sendOtpWhatsapp } = require('../../Utils/Phone/app');

const register = async(req,res)=>{
    try{
        const { email,name,password,role, phone} = req.body;
        console.log("Req",req.body);
        
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
        await sendWelcomeEmail(email,name);
        const otp = Math.floor(100000 + Math.random() * 900000);
        await sendEmailOtp(email,otp);
        const otpPhone = Math.floor(100000 + Math.random() * 900000);
       // await sendOtpWhatsapp(otpPhone,phone);
        const user = await User.create({
            name:name,
            PhoneNumber:phone,
            email:email,
            password:hashedPassword,
            role: role
        });
        console.log("User Created......");
        res.status(201).json({message:'Registration Successfull'})
    }catch(err){
        console.log("Err",err);
        res.status(500).json({message: "Registration Failed"});
    }
}

const findPhoneNumber = async(phone)=>{
    return validator.isMobilePhone(phone, 'any');
}

module.exports = { register }