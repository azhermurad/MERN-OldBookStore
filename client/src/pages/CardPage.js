import { useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';
import CardItem from '../components/shoppingCard/CardItem';
import Checkout from '../components/shoppingCard/Checkout';
import { fetchProductById, removeCardItem } from '../store/reducer/cardReducer';

const CardPage = (props) => {
    const { id } = useParams();
    const { search } = useLocation();
    const qty = Number(search.split('=')[1]);
    const card = useSelector((state) => state.cardState);
    const dispatch = useDispatch();
    const { cardItems, message, loading } = card;

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById({ id, qty }));
        }
    }, [dispatch, id, qty]);

    const removeCardItemHandler = (id) => {
        dispatch(removeCardItem(id));
    };

    return (
        <>
            {
                <Row>
                    {loading && <Loader />}
                    {message && <Message text={message} variant='success' />}
                    <Col md={8}>
                        <h1>Shopping Card </h1>
                        {cardItems.length === 0 ? (
                            <Message text={`Your Card is empty`}>
                                <Link to='/'>Go Back</Link>
                            </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cardItems.map((item) => (
                                    <CardItem
                                        item={item}
                                        click={removeCardItemHandler}
                                    />
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                    <Col md={4}>
                        <Checkout cardItems={cardItems} />
                    </Col>
                </Row>
            }
        </>
    );
};
export default CardPage;
