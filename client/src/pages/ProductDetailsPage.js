import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import BackButton from '../components/buttons/BackButton';
import ProductDetaiList from '../components/product/product_details/ProductDetailLIst';
import Rating from '../components/rating';
import AddToCard from '../components/product/add_to_card/AddToCard';
import { fetchProductDetails } from '../store/reducer/productDetailSlice';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';

const ProductDetails = () => {
    const { id } = useParams();
    const data = useSelector((state) => state.productDetailState);
    const { product, loading, error, message } = data;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    return (
        <>
            <BackButton src={'/'} title='Go Back' />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message text={error} />
            ) : message ? (
                <Message text={message} variant='success' />
            ) : product ? (
                <Row>
                    <Col md={6}>
                        <Image src={product?.image} fluid />
                    </Col>
                    <Col md={3}>
                        <ProductDetaiList
                            items={[
                                <h3>{product?.name}</h3>,
                                <Rating
                                    numReviews={product?.numReviews || 0}
                                    rating={product?.rating || 0}
                                />,
                                `Price: ${product?.price}`,
                                `Description: ${product?.description}`,
                            ]}
                        />
                    </Col>
                    <Col md={3}>
                        <AddToCard
                            price={product?.price}
                            countInStock={product?.countInStock}
                        />
                    </Col>
                </Row>
            ):null}
        </>
    );
};
export default ProductDetails;
