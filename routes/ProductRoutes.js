const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const Product = require('../models/Product');

router.get("/", productController.getAllProducts);
router.get("/search-filter", productController.searchProducts);
router.get("/:id", getProduct, productController.getProductById);
router.post("/", productController.createProduct);
router.delete("/:id", getProduct, productController.deleteProduct);
router.patch("/:id", getProduct, productController.updateProduct);




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

module.exports = router;
