const Product = require('../models/Product');

// @desc get all the products
// @router Get /api/products/:id
// @access Public
const getAllProducts = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.limit) || 8;
    const skip = pageSize * (page - 1);
    const search = req.query.search
        ? {
              name: {
                  $regex: req.query.search,
                  $options: 'i',
              },
          }
        : {};

    try {
        const total = await Product.count(search);
        const pages = Math.ceil(total / pageSize);
        const product = await Product.find(search)
            .sort({ _id: -1 })
            .limit(pageSize)
            .skip(skip);

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
            page,
            pages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing went wrong!try again',
            data: null,
        });
    }
};

// @desc get single product by its id
// @router Get /api/products/:id
// @access Public
const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id).populate({
            path: 'userId',
            select: ['name', 'email', 'isAdmin'],
        });
        console.log(product, 'product');
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
};

const createReview = async (req, res) => {
    const { rating, comment } = req.body;
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
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400).json({
                status: 'Error',
                message: 'Product already reviewed',
                data: null,
            });
            return;
        }

        const data = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(data);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((a, b) => a + b.rating, 0) /
            product.reviews.length;
        await product.save();
        res.status(201).json({
            status: 'Success',
            message: 'Review Added',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing Went Wrong!',
            data: null,
        });
    }
};

// @desc get top three product by its id
// @router Get /api/products/top
// @access Public
const getTopProduct = async (req, res) => {
    try {
        const product = await Product.find({}).sort('-rating').limit(3);
        console.log(product,"Dfd")
        if (product.length === 0) {
            res.status(200).json({
                status: 'Success',
                message: 'No Product Found',
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
};

module.exports = {
    getAllProducts,
    getProductById,
    createReview,
    getTopProduct,
};
