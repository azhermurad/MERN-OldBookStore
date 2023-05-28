import { useEffect } from 'react';
import { Col, Row, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemsPrice } from '../../store/reducer/cardReducer';

const OrderSummary = ({ submitHandler }) => {
    const { cardItems } = useSelector((state) => state.cardState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemsPrice = cardItems
        ?.reduce((x, item) => x + item.price * item.qty, 0)
        .toFixed(2);
    const tax = 0;
    const totalPrice = (Number(itemsPrice) + Number(tax) + Number(100)).toFixed(
        2
    );
    useEffect(() => {
        dispatch(addItemsPrice({ itemsPrice, tax, totalPrice }));
    }, [itemsPrice, tax, totalPrice, dispatch]);
    return (
        <>
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
                            <Col>{(100).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>{tax}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>{totalPrice} PKR</Col>
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

export default OrderSummary;
