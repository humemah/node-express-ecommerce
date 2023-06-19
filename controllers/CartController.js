const { createSuccessResponse, createErrorResponse } = require('../responseUtils');
const cartService = require('../services/CartServices');

const addToCart = async (req, res) => {
  try {
    const productName = req.body.productName;
    const userId = req.user.userId;

    const message = await cartService.addToCart(productName, userId);
    res.json(createSuccessResponse(message));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message || 'Failed to add product to cart'));
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await cartService.getCarts();
    res.json(createSuccessResponse(carts));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message || 'Failed to fetch carts'));
  }
};

module.exports = {
  addToCart,
  getCarts
};
