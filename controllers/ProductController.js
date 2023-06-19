// controllers/productController.js
const { createSuccessResponse, createErrorResponse } = require('../responseUtils');
const productService = require('../services/ProductServices');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('user_file');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(createSuccessResponse(products));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, price } = req.query;
    const products = await productService.searchProducts(name, price);
    res.json(createSuccessResponse(products));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};

exports.getProductById = async (req, res) => {
  try {
    // const productId = req.params.productId;
    const productId = req.params.id;

    const product = await productService.getProductById(productId);
    res.json(createSuccessResponse(product));
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

      const newProduct = await productService.createProduct(productData);
      res.status(201).json(createSuccessResponse(newProduct));
    } catch (err) {
      res.status(400).json(createErrorResponse(err.message));
    }
  });
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);
    res.json(createSuccessResponse({ message: "Product Deleted Successfully" }));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    const updatedProduct = await productService.updateProduct(productId, updatedData);
    res.json(createSuccessResponse(updatedProduct));
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
};
