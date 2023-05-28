const express = require('express');
const {
    getAllProducts,
    getProductById,
    createReview,
    getTopProduct,
} = require('../controllers/productController');
const admin = require('../middleware/adminRole');
const auth = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const upload = require('../routers/uploadRoute');
const router = express.Router();

// @desc get all the products
// @router Get /api/products/:id
// @access Public

router.get('/api/products', getAllProducts);


// @desc get top products
// @router Get /api/products/top
// @access private

router.get("/api/products/top",getTopProduct)

// @desc get single product by its id
// @router Get /api/products/:id
// @access Public

router.get('/api/products/:id', getProductById);

// @desc post add review
// @router Get /api/products/:id/review
// @access private


router.post("/api/product/:id/review",auth,createReview)




// Admin Role Routes

// delete user
router.delete('/api/product/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                status: 'Error',
                message: 'Product Not Found',
                data: null,
            });
            return;
        }
        await product.remove();
        res.status(200).json({
            status: 'Success',
            message: 'Product Deleted',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing Went Wrong!',
            data: null,
        });
    }
});

// create product in the database

router.post('/api/product', auth, async (req, res) => {
    try {
        const product = new Product({
            name: 'Sample name',
            price: 0,
            userId: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description',
        });
        await product.save();
        res.status(201).json({
            status: 'Success',
            message: 'Product Create',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing Went Wrong!',
            data: null,
        });
    }
});

// update product in the database
router.put(
    '/api/product/:id',
    auth,
    upload.single('image'),
    async (req, res) => {
        const { name, category, description, price, countInStock, brand } =
            req.body;
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                res.status(404).json({
                    status: 'Error',
                    message: 'Product Not Found',
                    data: null,
                });
                return;
            }
            product.name = name;
            product.price = price;
            product.description = description;
            product.image = "/"+req.file.path;
            product.brand = brand;
            product.category = category;
            product.countInStock = countInStock;
            await product.save();
            res.status(200).json({
                status: 'Success',
                message: 'Product Updated',
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                status: 'Error',
                message: 'SomeThing Went Wrong!',
                data: null,
            });
        }
    }
);



module.exports = router;
