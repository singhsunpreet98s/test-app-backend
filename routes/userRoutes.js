const express = require('express');
const router = express.Router();
const { signup } = require('./functions/userFuns');
const { login } = require('./functions/userFuns');
const { adminLogin } = require('./functions/userFuns')
const { body, validationResult } = require('express-validator');
router.post('/signup',
   body('email').isEmail(),
   body('password').isLength({ min: 5 }),
   body('firstName').isLength({ min: 2 }),
   body('lastName').isLength({ min: 2 }),
   body('phone').isLength({ min: 5 }),
   signup)
router.post('/login',
   body('email').isEmail(),
   body('password').isLength({ min: 5 }), login)
router.post('/adminLogin', adminLogin)
module.exports = router;