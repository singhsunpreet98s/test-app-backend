const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authentications')
const { getCart } = require('./functions/cartFuns')
const { addToCart } = require('./functions/cartFuns')
router.get('/', authenticate, getCart)
router.post('/addToCart', authenticate, addToCart)
module.exports = router