const express = require('express');
const router = express.Router();
const { createSuccessResponse, createErrorResponse } = require('../responseUtils');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('user_file');
const Product = require('../models/Product');


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(createSuccessResponse(products));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    res.json(createSuccessResponse(product));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, price } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    if (price) {
      query.price = { $lte: parseFloat(price) };
    }

    const products = await Product.find(query);
    res.json(createSuccessResponse(products));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};

exports.createProduct = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'File upload failed' });
    }

    try {
      const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        images: [req.file.filename],
      };

      const newProduct = await Product.create(productData);
      res.status(201).json(createSuccessResponse(newProduct));
    } catch (err) {
      res.status(400).json(createErrorResponse(err.message));
    }
  });
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    res.json(createSuccessResponse(updatedProduct));
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
    res.json(createSuccessResponse({ message: 'Product Deleted Successfully' }));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};
