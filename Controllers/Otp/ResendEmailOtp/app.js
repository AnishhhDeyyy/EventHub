const { where } = require("sequelize");
const { User } = require("../../../Models/User/app");
const { UserOtp } = require("../../../Models/UserOtp/app");
const { sendEmailOtp } = require("../../../Utils/Mailer/app");


const resendEmailOtp = async(req,res)=>{
    try{
        const { email } = req.body;
        const findEmail = await User.findOne({where:{email:email}});
        if(!findEmail){
            return res.status(400).json({message: "Email not exists"})
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        //await sendEmailOtp(email,otp);
        const expiresAt =  new Date(Date.now() + 10 * 60 * 1000); 
        const updateOtp = await UserOtp.update({
            otp:otp,
            expires_at: expiresAt
        },
        {where: {email:email,otp_type:'email'}}
    )
    res.status(200).json({message:"Resend Email Otp SuccessFully"});
    }catch(err){
        console.log("Error",err);
        
    }
}

module.exports = { resendEmailOtp }