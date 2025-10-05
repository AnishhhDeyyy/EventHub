const rateLimit = require('express-rate-limit')

const userLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 2,
  message: "Too many OTP resend requests. Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user || "guest", 
});

module.exports = { userLimiter }
