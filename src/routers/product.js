const express = require('express');
const { getAllProducts,getProductById } = require('../controllers/productController');
const Product = require('../models/Product');
const router = express.Router();

// @desc get all the products
// @router Get /api/products/:id
// @access Public

router.get('/api/products',getAllProducts);

// @desc get single product by its id
// @router Get /api/products/:id
// @access Public

router.get('/api/products/:id', getProductById);

module.exports = router;
