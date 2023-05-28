import { useEffect } from 'react';
import { Col, Row, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../components/checkout/CheckoutStep';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';
import OrderSummary from '../components/placeorder/OrderSummary';
import { createOrder } from '../store/reducer/orderSlice';
import { EmptyCard } from '../store/reducer/cardReducer';

const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        cardItems,
        paymentMethod,
        shippingAddress,
        taxPrice,
        shippingPrice,
        totalPrice,
        itemsPrice,
    } = useSelector((state) => state.cardState);
    const { order, message, error, loading } = useSelector(
        (state) => state.orderState
    );

    useEffect(() => {
        if (order) {
            dispatch(EmptyCard())
            navigate('/order/' + order._id);
        }
    }, [order, navigate,dispatch]);
    const placeOrderHandler = () => {
        const items = cardItems?.map((item) => {
            return {
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                product: item._id,
            };
        });
        dispatch(
            createOrder({
                orderItems: items,
                shippingAddress,
                paymentMethod,
                taxPrice,
                shippingPrice,
                totalPrice,
                itemsPrice,
            })
        );
    };

    return (
        <>
            <CheckoutStep step1 step2 step3 step4 />
            <Row>
                {loading && <Loader />}

                {error && <Message text={error} />}
                {message && <Message variant='success' text={message} />}
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p style={{ textTransform: 'capitalize' }}>
                                <strong>Address:</strong>{' '}
                                {shippingAddress.address} {shippingAddress.city}{' '}
                                {shippingAddress.postal_code},{' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <div style={{ textTransform: 'capitalize' }}>
                                <strong>Method:</strong>{' '}
                                {paymentMethod ? (
                                    paymentMethod
                                ) : (
                                    <Message text={`Add Payment Method`}>
                                        <Link to='/payment'>Payment</Link>
                                    </Message>
                                )}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cardItems.length === 0 ? (
                                <Message text={'No Items in the Card'} />
                            ) : (
                                <ListGroup variant='flush'>
                                    {cardItems.map((item, index) => (
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
                                                    {`${item.qty} x ${
                                                        item.price
                                                    } = ${(
                                                        item.qty * item.price
                                                    ).toFixed(2)} PKR`}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <OrderSummary submitHandler={placeOrderHandler} />
                </Col>
            </Row>
        </>
    );
};

// we have to fetch the card data on this page and add the tax

export default PlaceOrderPage;
