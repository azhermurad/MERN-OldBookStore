import { useDispatch } from 'react-redux';
import { Button, Col, Form, Image, ListGroupItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchProductById } from '../../store/reducer/cardReducer';

const CardItem = ({ item, click }) => {
    const dispatch = useDispatch();

    return (
        <ListGroupItem>
            <Row className='align-items-center'>
                <Col md={2}>
                    <Image fluid rounded thumbnail src={item.image} />
                </Col>
                <Col md={3}>
                    <Link to={'/products/' + item._id}>{item.name}</Link>
                </Col>
                <Col md={2}>{item.price} PKR</Col>
                <Col md={3} className='d-flex'>
                    <div className='px-1'> {item.qty}</div>
                    <Form.Range
                        value={item.qty}
                        min='1'
                        max={item.countInStock}
                        step='1'
                        disabled={item.countInStock === 0}
                        onChange={(e) => {
                            console.log('the function is calling');
                            dispatch(
                                fetchProductById({
                                    id: item._id,
                                    qty: Number(e.target.value),
                                })
                            );
                        }}
                    />
                </Col>
                <Col md={2}>
                    <Button
                        variant='light'
                        className='p-0'
                        onClick={() => {
                            click(item._id);
                        }}
                    >
                        <i className='fas fa-trash' />
                    </Button>
                </Col>
            </Row>
        </ListGroupItem>
    );
};

export default CardItem;
