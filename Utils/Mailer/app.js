const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: process.env.Email_User,
        pass: process.env.Email_Pass
    }
});

const sendWelcomeEmail = async(to,name)=>{
    try{
        await transporter.sendMail({
      from: `"EventHub 🎉" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Welcome to EventHub!",
      html: `
        <h2>Hi ${name},</h2>
        <p>🎉 Welcome to <b>EventHub</b>!</p>
        <p>You can now explore and book amazing events with us.</p>
        <br/>
        <p>Best Regards, <br/> EventHub Team</p>`

        })
        console.log("Welcome Email Sent");
        
    }catch(err){
        console.log("Email Not Sent",err);

    }
}

const sendEmailOtp = async (to,otp)=>{
try{
    await transporter.sendMail({
      from: `"EventHub " <${process.env.EMAIL_USER}>`,
      to,
      subject: "OTP VERIFICATION!",
      html: `
        <p>🎉 Your Otp is  <b>${otp}</b></p>`
        })
        console.log("OTP Email Sent");
        
    }catch(err){
        console.log("Email Not Sent",err);

    }
}
module.exports = { sendWelcomeEmail, sendEmailOtp }