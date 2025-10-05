const bcrypt = require('bcrypt');
const { User } = require('../../Models/User/app');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const { UserOtp } = require('../../Models/UserOtp/app');
const login = async (req,res) => {
    try{
        const { email,password } = req.body;
        const isUserExists = await User.findOne({where:{email:email}});
        if(!isUserExists){
            return res.status(400).json({message: 'User not Exists'});
        }
        const userPassword = isUserExists.password;
        const changedPassword = await bcrypt.compare(password,userPassword);
        const token = jwt.sign(
            {user: email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        if(changedPassword){
        const otp = Math.floor(100000 + Math.random() * 900000);
      //  await sendEmailOtp(email,otp);
        const expiresAt =  new Date(Date.now() + 10 * 60 * 1000); 
        const userotpEmail = await UserOtp.update({
                otp: otp,
                expires_at: expiresAt,
                update_at:  new Date(),
            },
            {where:{
                email:email,
                otp_type:'email'
            }
            }
        )
        const findPhoneNo = await User.findOne({where: {email: email}});
        const phone = findPhoneNo.PhoneNumber;
         const otpPhone = Math.floor(100000 + Math.random() * 900000);
       // await sendOtpWhatsapp(otpPhone,phone);
      const userPhoneotp = await UserOtp.update({
                otp: otpPhone,
                expires_at: expiresAt,
                update_at:  new Date(),
            },
            {where:{
                email:email,
                otp_type:'phone'
            }
            }
        )
            res.status(200).json({message: 'Login Successfully',token: token})
        }else{
            res.status(400).json({message: 'Incorrect Username or Password'})
        }
     }catch(err){
        console.log("Login Error",err);
        
    }
}

module.exports = { login }