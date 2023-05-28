const Order = require('../models/order');
// @desc create orders 
// @router Post /api/oders
// @access private
const orderCreate = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    try {
        const placeOrder = new Order({
            userId: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        if (orderItems && orderItems.length === 0) {
            res.status(400).json({
                status: 'Error',
                message: 'No OrderItem',
                data: null,
            });
            return;
        }
        if (!paymentMethod) {
            res.status(400).json({
                status: 'Error',
                message: 'No payment Method',
                data: null,
            });
            return;
        }
        await placeOrder.save();
        res.status(200).json({
            status: 'Success',
            message: 'Order successfully Created',
            data: placeOrder,
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

// @desc Get single order by its id
// @router Get /api/order/:id
// @access Private



const getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id).populate({path:"userId",select:["name","email"]});
        if (!order) {
            res.status(404).json({
                status: 'Error',
                message: 'No Order Found By ID',
                data: null,
            });
            return;
        }
        res.status(200).json({
            status: 'Success',
            message: 'Data successfully display',
            data: order,
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


// @desc Update order to paid
// @router Get /api/order/:id/pay
// @access Private



const updateOrderToPaid = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({
                status: 'Error',
                message: 'No Order Found By ID',
                data: null,
            });
            return;
        }
        order.isPaid=true;
        order.paidAt = Date.now();
        order.paymentResult= {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        await order.save()
        res.status(200).json({
            status: 'Success',
            message: 'Your Order Is Paid',
            data: order,
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



// @desc Update order to Delivered
// @router Get /api/order/:id/delivered
// @access Private

const updateOrderToDelivered = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({
                status: 'Error',
                message: 'No Order Found By ID',
                data: null,
            });
            return;
        }
        order.isDelivered=true;
        order.deliveredAt = Date.now();
        await order.save()
        res.status(200).json({
            status: 'Success',
            message: 'Your Order Is Delivered',
            data: order,
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



// @desc Get Login user order list
// @router Get /api/order/myorders
// @access Private



const getUserOrderList = async (req, res) => {
    // console.log(req.user)
    try {
        const order = await Order.find({ userId: req.user._id})
        if (!order) {
            res.status(404).json({
                status: 'Error',
                message: 'No Order Found',
                data: null,
            });
            return;
        }
        res.status(200).json({
            status: 'Success',
            message: 'Data successfully display',
            data: order,
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


const getOrderByAdmin = async (req, res) => {
    try {
        const order = await Order.find({}).populate({path:"userId",select:["id","name","email"]});
        if (order.length==0) {
            res.status(404).json({
                status: 'Error',
                message: 'No Order Found ',
                data: null,
            });
            return;
        }
        res.status(200).json({
            status: 'Success',
            message: 'Data successfully display',
            data: order,
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
    orderCreate,
    getOrderById,
    updateOrderToPaid,
    getUserOrderList,
    updateOrderToDelivered,
    getOrderByAdmin
};

