import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, Placeholder } from 'react-bootstrap';
import Product from '../components/product/Product';
import { fetchAllPosts } from '../store/reducer/productSlice';
import Message from '../components/message/Message';
import Search from '../components/search';
import { useLocation } from 'react-router-dom';
import PaginationBasic from '../components/pagination';
import ProductSlider from '../components/slider';

const HomePage = () => {
    const data = useSelector((state) => state.productState);
    const { search } = useLocation();
    const keyword = new URLSearchParams(search).get('search') || '';
    const pageNumber = new URLSearchParams(search).get('pageNumber') || 1;

    const { prodcuts, loading, error, message, page, pages } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllPosts({ keyword, pageNumber }));
    }, [dispatch, keyword, pageNumber]);
    return (
        <>
            {!keyword && <ProductSlider />}
            <h1 style={{textAlign: "center",marginTop:"20px"}}>Search Your Product</h1>
            <Search />
            <h1>Latest Products</h1>
           
            {error ? (
                <Message text={error} />
            ) : message ? (
                <Message text={message} variant='success' />
            ) : (
                <Row>
                    {loading ? (
                        [...Array(8).keys()].map((__, index) => (
                            <Col key={index} sm={12} md={6} lg={4} xl={3}>
                                <Card className='rounded my-3'>
                                    <Card.Body>
                                        <Placeholder
                                            as={Card.Title}
                                            animation='glow'
                                        >
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder
                                            as={Card.Text}
                                            animation='glow'
                                        >
                                            <Placeholder xs={7} />{' '}
                                            <Placeholder xs={4} />{' '}
                                            <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} />{' '}
                                            <Placeholder xs={8} />
                                        </Placeholder>
                                        <Placeholder.Button
                                            variant='primary'
                                            xs={6}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <>
                            {' '}
                            {prodcuts.map((product, index) => (
                                <Col key={index} sm={12} md={6} lg={3} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                            <PaginationBasic
                                page={page}
                                pages={pages}
                                keyword={keyword}
                            />
                        </>
                    )}
                </Row>
            )}
        </>
    );
};

export default HomePage;
