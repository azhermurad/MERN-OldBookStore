import { useState } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetaiList from '../product_details/ProductDetailLIst';

const AddToCard = ({ price, countInStock }) => {
    const [items, setItems] = useState(1);
    const { id } = useParams()
    const navigate = useNavigate()
    const addToCardHandler = () => {
        navigate(`/card/${id}?qty=${items}`)
    }
    return (
        <Card className='py-2'>
            <ProductDetaiList
                items={[
                    <Row>
                        <Col>
                            <strong>Price:</strong>
                        </Col>
                        <Col>${price}</Col>
                    </Row>,
                    <Row>
                        <Col>
                            <strong>Status:</strong>
                        </Col>
                        <Col>
                            {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                    </Row>,
                    <>
                        <Row>
                            <Col>
                                <strong>Qty:  {items}</strong>
                            </Col>
                            <Col>
                                <Form.Range
                                    value={items}
                                    min='1'
                                    max={countInStock}
                                    step='1'
                                    disabled={countInStock === 0}
                                    onChange={(e) => {
                                        setItems(e.target.value);
                                    }}
                                />
                            </Col>
                        </Row>
                    </>,
                    <div className='d-grid'>
                        <Button
                            onClick={addToCardHandler}
                            variant='primary'
                            type='button'
                            disabled={countInStock === 0}
                        >
                            Add To Card
                        </Button>
                    </div>,
                ]}
            />
        </Card>
    );
};
export default AddToCard;
