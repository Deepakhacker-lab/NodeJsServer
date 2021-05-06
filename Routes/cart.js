const express = require('express');
const cartController = require('../Controllers/cartController');
const isAuth = require('../Middleware/midAuth');

const router = express.Router();

router.get('/totalcount',isAuth,cartController.count);

router.get('/cartItems', isAuth, cartController.cartItems);

router.post('/newItem',isAuth, cartController.AddCart);

module.exports = router;