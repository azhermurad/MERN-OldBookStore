const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// @desc get all the products
// @router Get /api/products/:id
// @access Public

router.get('/api/products', async (req, res) => {
    try {
        const product = await Product.find({});
        if (product.length === 0) {
            res.status(200).json({
                status: 'Success',
                message: 'No product to show',
                data: null,
            });
            return;
        }
        res.status(200).json({
            status: 'Success',
            message: 'Data successfully display',
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Error',
            message: 'SomeThing went wrong!try again',
            data: null,
        });
    }
});
 
// @desc get single product by its id
// @router Get /api/products/:id
// @access Public

router.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(200).json({
                status: 'Success',
                message: 'No Product Found By ID',
                data: null,
            });
            return;
        }
        res.status(200).json({
            status: 'Success',
            message: 'Data successfully display',
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Error',
            message: 'SomeThing went wrong!try again',
            data: null,
        });
    }
});

module.exports = router;
