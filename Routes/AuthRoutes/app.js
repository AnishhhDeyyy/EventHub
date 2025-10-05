const express = require('express');
const { register } = require('../../Controllers/Register/app');
const { login } = require('../../Controllers/Login/app');
const { resendEmailOtp } = require('../../Controllers/Otp/ResendEmailOtp/app');
const { verify } = require('../../MiddleWare/verify/app');
const { ipLimiter } = require('../../Utils/IpLimiting/app');
const { userLimiter } = require('../../Utils/UserLimiting/app');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/resend-email',verify,ipLimiuster,userLimiter,resendEmailOtp)
module.exports = router;