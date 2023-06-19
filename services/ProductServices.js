// services/productService.js
const Product = require('../models/Product');

exports.getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.searchProducts = async (name, price) => {
  try {
    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    if (price) {
      query.price = { $lte: parseFloat(price) };
    }

    const products = await Product.find(query);
    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.getProductById = async (productId) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  

exports.createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    const newProduct = await product.save();
    return newProduct;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.deleteOne();
    return { message: 'Product Deleted Successfully' };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateProduct = async (productId, updatedData) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, updatedData);
    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (err) {
    throw new Error(err.message);
  }
};
