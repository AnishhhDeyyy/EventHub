const express = require('express');
const { register } = require('../../Controllers/Register/app');
const router = express.Router();

router.post('/register',register);

module.exports = router;