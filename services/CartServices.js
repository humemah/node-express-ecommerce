const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (productName, userId) => {
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

  return 'Product added to cart';
};

const getCarts = async () => {
  return await Cart.find();
};

module.exports = {
  addToCart,
  getCarts
};
