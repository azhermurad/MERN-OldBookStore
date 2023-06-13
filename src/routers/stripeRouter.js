const express = require('express');
const stripe = require('stripe')(
    'sk_test_51MiZG6E77UV9VQJPTrpOf8Eo22Ey2a8XB3BuW0G88JUp3rqX0vlXTZUDFloaF5wPChy8XWe8K4udqri0O5R43XBU00UhrgkKUD'
);
const router = express.Router();
const Order = require('../models/order');

router.post('/api/create-checkout-session/:id', async (req, res) => {
    const id = req.params.id;
    const books = await Order.findById(id);

    const customer = await stripe.customers.create({
        // this email is the defaut email for all the user in the database 
        // email: 'azher@gmail.com',
        metadata: {
            orderId: id,
        },
    });

    const session = await stripe.checkout.sessions.create({ 
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'PKR',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 100 * 100,
                        currency: 'PKR',
                    },
                    display_name: 'Next Day',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    },
                },
            },
        ],

        line_items: books.orderItems.map((item) => {
            // const percentage = item.discount / 100;
            // let actualPrice = item.price - item.price * percentage;
            // actualPrice = parseFloat(actualPrice);
            // actualPrice = actualPrice * 100;
            // actualPrice = actualPrice.toFixed(1);
            return {
                price_data: {
                    currency: 'PKR',
                    product_data: {
                        name: item.name,
                        // images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-nRo-hBIRdSZkCXHJsxCbGUS9N9JaxDThbr6i8LE3A&s"]
                    },
                    unit_amount_decimal: (item.price * 100).toFixed(2),
                },
                quantity: item.qty,
            };
        }),

        customer: customer.id,
        mode: 'payment',
        success_url: 'http://localhost:3000/order/'+ id,
        cancel_url: 'http://localhost:3000/order/' + id,
    });
    //   this is the redirect url
    res.send({ url: session.url });
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
    'whsec_9c12ec05e1cd1207eabdbf6e2fa88ffcd19a941041cb72bb51f6d3674dfb4ed3';

router.post(
    '/api/webhook',
    express.raw({ type: 'application/json' }),
    async (request, response) => {
        const sig = request.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                request.rawBody,
                sig,
                endpointSecret
            );
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            // ... handle other event types
            case 'checkout.session.completed':
                const data = event.data.object;
                let customer = await stripe.customers.retrieve(data.customer);
                console.log(customer);
                const orderId = customer.metadata.orderId;
                const order = await Order.findById(orderId);
                order.isPaid = true;
                order.paidAt = Date.now();

                await order.save();
                // customer = JSON.parse(customer?.metadata?.cart);
                // customer.forEach(async (ctr) => {
                //   try {
                //     let reviewStatus = false;
                //     const findOrder = await OrderModel.findOne({
                //       productId: ctr._id,
                //       userId: ctr.userId,
                //     })
                //       .where("review")
                //       .equals(true);
                //     if (findOrder) {
                //       reviewStatus = true;
                //     }
                //     await OrderModel.create({
                //       productId: ctr._id,
                //       userId: ctr.userId,
                //       size: ctr.size,
                //       color: ctr.color,
                //       quantities: ctr.quantity,
                //       address: data.customer_details.address,
                //       review: reviewStatus,
                //     });
                //     const product = await ProductModel.findOne({ _id: ctr._id });
                //     if (product) {
                //       let stock = product.stock - ctr.quantity;
                //       if (stock < 0) {
                //         stock = 0;
                //       }
                //       await ProductModel.findByIdAndUpdate(
                //         ctr._id,
                //         { stock },
                //         { new: true }
                //       );
                //     }
                //   } catch (error) {
                //     console.log(error.message);
                //     return response.status(500).json("Server internal error");
                //   }
                // });
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send().end();
    }
);
module.exports = router;

