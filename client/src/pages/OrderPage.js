import { useEffect, useState } from 'react';
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';
import {
    getOrderById,
    resetPayment,
    updateOrderPay,
    updateOrderDelivered,
} from '../store/reducer/orderSlice';
import { PayPalButton } from 'react-paypal-button-v2';
import addPayPalScript from '../utlil/addPaypalScript';
import axios from 'axios';

const OrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sdk, setSdk] = useState(false);
    const { id } = useParams();

    const { user } = useSelector((state) => state.userState);
    const { paymentMethod } = useSelector((state) => state.cardState);
    const { order, orderPayment, orderDeliverd, message, error, loading, pay } =
        useSelector((state) => state.orderState);
    const successHandler = (paymentResult) => {
        // OPTIONAL: Call your server to save the transaction
        dispatch(updateOrderPay(id, paymentResult));
    };

    const stripeHandler = async () => {
        const data = await axios(`/api/create-checkout-session/${id}`,{method: "post"})
        window.location.href = data.data.url
    };

    const itemsPrice = order?.orderItems
        ?.reduce((x, item) => x + item.price * item.qty, 0)
        .toFixed(2);

    // we have to create the open api to get the current dollar rate for our nodejs application so the value is convert to the pkr in the application

    useEffect(() => {
        if (!order || orderPayment || orderDeliverd || order._id !== id) {
            dispatch(resetPayment());
            dispatch(getOrderById(id));
        } else if (!order?.isPaid) {
            if (!window.paypal) {
                addPayPalScript(() => {
                    setSdk(true);
                });
            } else {
                setSdk(true);
            }
        }
    }, [dispatch, id, order, orderPayment, orderDeliverd]);

    const deliveredHandler = () => {
        dispatch(updateOrderDelivered(order?._id));
    }


    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message text={message} />
            ) : (
                <Row>
                    <h1 color='gray'>Order {order?._id}</h1>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order?.userId.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>
                                    <a href={`mailto:${order?.userId.email}`}>
                                        {order?.userId.email}
                                    </a>
                                </p>
                                <p style={{ textTransform: 'capitalize' }}>
                                    <strong>Address:</strong>{' '}
                                    {order?.shippingAddress.address}{' '}
                                    {order?.shippingAddress.city}{' '}
                                    {order?.shippingAddress.postal_code},{' '}
                                    {order?.shippingAddress.country}
                                </p>
                                <p>
                                    {order?.isDelivered ? (
                                        <Message
                                            variant='success'
                                            text={`Delivered At ${order.deliveredAt}`}
                                        />
                                    ) : (
                                        <Message text='Not Delivered' />
                                    )}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <div style={{ textTransform: 'capitalize' }}>
                                    <p>
                                        <strong>Method:</strong>{' '}
                                        {order?.paymentMethod}
                                    </p>{' '}
                                    {order?.isPaid ? (
                                        <Message
                                            variant='success'
                                            text={`Paid At ${order.paidAt}`}
                                        />
                                    ) : (
                                        <Message text='Not Paid' />
                                    )}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order?.orderItems.length === 0 ? (
                                    <Message text={'Order is Empty!'} />
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order?.orderItems.map(
                                            (item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col sm={1}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                                to={
                                                                    '/products/' +
                                                                    item._id
                                                                }
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col sm={4}>
                                                            {`${item.qty} x $${
                                                                item.price
                                                            } = $${(
                                                                item.qty *
                                                                item.price
                                                            ).toFixed(2)}`}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        )}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>{itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>{order?.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>{order?.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>{order?.totalPrice}</Col>
                                    </Row>
                                    {/* /the best solution is  */}
                                </ListGroup.Item>
                                {/* <form
                                    action='/create-checkout-session'
                                    method='POST'
                                >
                                    <button type='submit'>Checkout</button>
                                </form> */}

                                {(!order?.isPaid && !user?.isAdmin) && ( //
                                    <ListGroup.Item>
                                        {/* {!sdk ? (
                                            <Loader />
                                        ) : paymentMethod === 'Stripe' ? (
                                            <div className='d-grid gap-2 py-4'>
                                                <Button
                                                    type='button'
                                                    variant='success'
                                                    onClick={stripeHandler}
                                                >
                                                    Pay With Card
                                                </Button>
                                            </div>
                                        ) : (
                                            <PayPalButton
                                                amount={order?.totalPrice}
                                                shippingPreference='NO_SHIPPING' // default is "GET_FROM_FILE"
                                                onSuccess={successHandler}
                                            />
                                        )} */}
                                          <div className='d-grid gap-2 py-4'>
                                                <Button
                                                    type='button'
                                                    variant='success'
                                                    onClick={stripeHandler}
                                                >
                                                    Pay With Card
                                                </Button>
                                            </div>
                                    </ListGroup.Item>
                                )}
                                {user?.isAdmin &&
                                    order?.isPaid &&
                                    !order?.isDelivered && (
                                        <ListGroup.Item>
                                            <div className='d-grid gap-2'>
                                                <Button
                                                    type='button'
                                                    onClick={deliveredHandler}
                                                >
                                                    Mark Delivered
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    )}
                            </ListGroup>
                        </Card>
                    </Col>
                    {}
                </Row>
            )}
        </>
    );
};

export default OrderPage;
