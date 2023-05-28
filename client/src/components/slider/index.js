import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTop } from '../../store/reducer/productSlice';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../loader/Loader';
import Message from '../message/Message';
import { Link } from 'react-router-dom';
import Rating from '../rating';

const ProductSlider = () => {
    const data = useSelector((state) => state.productState);
    const { topProducts, loading, error } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTop());
    }, [dispatch]);
    return loading ? (
        <Loader />
    ) : (
        <Carousel pause='hover' className='slider_main bg-dark'>
            {topProducts?.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={'/products/' + product._id}>
                        <Image src={product.image} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h3>
                                {product.name} {product.price}
                            </h3>
                        </Carousel.Caption>
                        <div className='carousel_rating'>
                            <Rating
                                numReviews={product.numReviews}
                                rating={(product?.rating) || 0}
                            />
                        </div>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
export default ProductSlider;
