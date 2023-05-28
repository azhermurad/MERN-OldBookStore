const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
    orderCreate,
    getOrderById,
    updateOrderToPaid,
    getUserOrderList,
    updateOrderToDelivered,
    getOrderByAdmin,
} = require('../controllers/orderController');
const admin = require('../middleware/adminRole');
const Order = require('../models/order');

const router = express.Router();

// @desc create order
// @router Post /api/order
// @access Public
router.post('/api/order', auth, orderCreate);

// @desc Get Login User Orders
// @router Put /api/order/myorders
// @access private
router.get('/api/order/myorders', auth, getUserOrderList);

// @desc get single order by its id
// @router Get /api/order/:id
// @access Public

router.get('/api/order/:id', auth, getOrderById);

// @desc Update order to paya
// @router Put /api/order/:id/pay
// @access private

router.put('/api/order/:id/pay', auth, updateOrderToPaid);

// @desc get all order by admin
// @router Get /api/order
// @access private/admin
router.get('/api/orders', auth, admin, getOrderByAdmin);

// @desc Update order to Delivered
// @router Put /api/order/:id/delivered
// @access private/admin

router.put('/api/order/:id/delivered', auth, admin, updateOrderToDelivered);




// @desc Update order to paya
// @router Put /api/order/:id/pay
// @access private


// delete user
router.delete('/api/order/:id/delete', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        console.log(req.user)
        console.log(order.userId !== req.user._id)
        if (!order || !(order.userId !== req.user._id)) {
            res.status(404).json({
                status: 'Error',
                message: 'order Not Found',
                data: null,
            });
            return;
        }
      
       
        await order.remove();
        res.status(200).json({
            status: 'Success',
            message: 'User Deleted',
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing Went Wrong!',
            data: null,
        });
    }
});

module.exports = router;
