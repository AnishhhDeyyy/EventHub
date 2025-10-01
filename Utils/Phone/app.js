const twilio = require('twilio');
require('dotenv').config() ;
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendOtpWhatsapp(otp,userNumber) {
    console.log(process.env.TWILIO_WHATSAPP_NUMBER);
console.log("FROM:", `"${process.env.TWILIO_WHATSAPP_NUMBER}"`);
console.log("TO:", `"whatsapp:+916290723012"`);
console.log("SID:", `"${process.env.TWILIO_ACCOUNT_SID}"`);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "*****" : "MISSING");

    const cleanedNumber = userNumber.trim();
  const message = await client.messages.create({
    body: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: `whatsapp:${cleanedNumber}`
  });

  console.log("✅ OTP sent:", otp, "SID:", message.sid);
}

module.exports = { sendOtpWhatsapp }

