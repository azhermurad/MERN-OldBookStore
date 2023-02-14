import { Col, Row, ListGroup, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../components/checkout/CheckoutStep';
import Message from '../components/message/Message';
import OrderSummary from '../components/placeorder/OrderSummary';

const PlaceOrderPage = () => {
    const { cardItems, paymentMethod, shippingAddress } = useSelector(
        (state) => state.cardState
    );
    const navigate = useNavigate();
    console.log(shippingAddress, paymentMethod, cardItems);

    const placeOrderHandler = () => {
        console.log('order is place!');

        // var WinPrint = window.open(
        //     'a',
        //     'a',
        //     'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
        // );
        // WinPrint.document.write('<h1 style="color:blue;">print</h1>');
        // WinPrint.document.close();
        // WinPrint.focus();
        // WinPrint.print();
        // WinPrint.close();
    };
    return (
        <>
            <CheckoutStep step1 step2 step3 step4 />
            <Row>
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
                            <p style={{ textTransform: 'capitalize' }}>
                                <strong>Method:</strong> {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cardItems.length == 0 ? (
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
                                                    {`${item.qty} x $${
                                                        item.price
                                                    } = $${(
                                                        item.qty * item.price
                                                    ).toFixed(2)}`}
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
