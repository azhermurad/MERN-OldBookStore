import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/product/Product';
import { fetchAllPosts } from '../store/reducer/productSlice';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';

const HomePage = () => {
    const data = useSelector((state) => state.productState);
    const { prodcuts, loading, error, message } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message text={error} />
            ) : message ? (
                <Message text={message} variant='success' />
            ) : (
                <Row>
                    {prodcuts.map((product, index) => (
                        <Col key={index} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomePage;
