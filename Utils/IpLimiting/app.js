const rateLimit = require('express-rate-limit')
const ipLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: "Too many requests from this IP. Try again after 5 minutes.",
  keyGenerator: (req) => req.ip,
});

module.exports = { ipLimiter }