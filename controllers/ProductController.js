const express = require('express');
const router = express.Router();
const { createSuccessResponse, createErrorResponse } = require('../responseUtils');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('user_file');
const Product = require('../models/Product');

// Middleware function to fetch a product by ID
async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.product = product;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(createSuccessResponse(products));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
});

// Get a specific product
router.get('/:id', getProduct, (req, res) => {
  res.json(createSuccessResponse(res.product));
});

// Create a new product
router.post('/', upload, async (req, res) => {
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

// Update a product
router.patch('/:id', getProduct, async (req, res) => {
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
});

// Delete a product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
    res.json(createSuccessResponse({ message: 'Product deleted successfully' }));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
});


