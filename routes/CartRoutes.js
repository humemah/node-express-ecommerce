
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { authenticateToken } = require('../controllers/UserController');

router.get('/', CartController.getCarts);
router.post('/add-to-cart', authenticateToken, CartController.addToCart);
module.exports = router;

  