import { useEffect, useRef } from 'react';
import { Col, Row, ListGroup, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({submitHandler}) => {
    const { cardItems } = useSelector((state) => state.cardState);
    const navigate = useNavigate();
    const ref = useRef()

    const itemsPrice = cardItems
        ?.reduce((x, item) => x + item.price * item.qty, 0)
        .toFixed(2);
    const tax = (0.05 * itemsPrice).toFixed(2);
    const totalPrice = (Number(itemsPrice) + Number(tax) + Number(1)).toFixed(
        2
    );

    
    return (
        <>
            <Card ref={ref}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${(1).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${tax}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='d-grid gap-2'>
                            <Button
                                type='button'
                                disabled={cardItems.length === 0}
                                onClick={submitHandler}
                            >
                                Place Order
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    );
};

// we have to fetch the card data on this page and add the tax

export default OrderSummary;
