const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { createSuccessResponse, createErrorResponse } = require('../responseUtils');

exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(createSuccessResponse(carts));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message || 'Failed to fetch carts'));
  }
};

exports.addToCart = async (req, res) => {
  try {
    const productName = req.body.productName;
    const userId = req.user.userId;

    const product = await Product.findOne({ name: productName });
    if (!product) {
      throw new Error('Product not found');
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] });
    } else if (!cart.items) {
      cart.items = [];
    }

    const item = {
      product: product._id,
      quantity: 1,
      price: product.price
    };

    cart.items.push(item);
    cart.totalPrice += item.price;

    await cart.save();

    res.json(createSuccessResponse('Product added to cart'));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message || 'Failed to add product to cart'));
  }
};
