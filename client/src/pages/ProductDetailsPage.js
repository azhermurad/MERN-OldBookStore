import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form ,Modal} from 'react-bootstrap';
import BackButton from '../components/buttons/BackButton';
import ProductDetaiList from '../components/product/product_details/ProductDetailLIst';
import Rating from '../components/rating';
import AddToCard from '../components/product/add_to_card/AddToCard';
import {
    createReview,
    fetchProductDetails,
    resetResetProductDetail,
} from '../store/reducer/productDetailSlice';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';

const ProductDetails = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { user } = useSelector((state) => state.userState);
    const data = useSelector((state) => state.productDetailState);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        product,
        loading,
        error,
        message,
        reviewError,
        reviewLoading,
        reviewSuccess,
    } = data;
    const dispatch = useDispatch();

    useEffect(() => {
        if (reviewSuccess) {
            setRating(0);
            setComment('');
            dispatch(resetResetProductDetail());
        }
        dispatch(fetchProductDetails(id));
    }, [dispatch, id, reviewSuccess]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createReview({ id, rating, comment }));
    };
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
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product?.image} fluid />
                        </Col>
                        <Col md={3}>
                            <ProductDetaiList
                                items={[
                                    <h3>{product?.name}</h3>,
                                    `Post By: ${product?.userId?.name}`,
                                    <Rating
                                        numReviews={product?.numReviews || 0}
                                        rating={product?.rating || 0}
                                    />,
                                    `Price: ${product?.price} PKR`,
                                    `Description: ${product?.description}`,
                                ]}
                            />
                        </Col>
                        <Col md={3}>
                        <AddToCard
                                    price={product?.price}
                                    countInStock={product?.countInStock}
                                />
                            {/* {product?.userId?.isAdmin ? (
                                <AddToCard
                                    price={product?.price}
                                    countInStock={product?.countInStock}
                                />
                            ) : (
                                <Button
                                    onClick={handleShow}
                                    variant='primary'
                                    type='button'
                                >
                                    Contact With Seller
                                </Button>
                            )} */}
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop='static'
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Seller Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <ProductDetaiList
                                items={[
                                    <h3>{product?.userId?.name}</h3>,
                                    <a href={`mailto:${product?.userId?.email}`}>
                                    {product?.userId?.email}
                                </a>,
                                   
                                    `Mobile Number: 03400404974`,
                                ]}
                            />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant='secondary'
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-3' md={6}>
                            <h3>Reviews</h3>
                            {product?.reviews?.length === 0 && (
                                <Message
                                    text={'No Reviews'}
                                    variant='success'
                                />
                            )}
                            <ListGroup variant='flush'>
                                {product.reviews?.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating
                                            // numReviews={review.numReviews || 0}
                                            rating={review.rating || 0}
                                        />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {reviewSuccess && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {reviewLoading && <Loader />}
                                    {reviewError && (
                                        <Message variant='danger'>
                                            {reviewError}
                                        </Message>
                                    )}
                                    {user ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value=''>
                                                        Select...
                                                    </option>
                                                    <option value='1'>
                                                        1 - Poor
                                                    </option>
                                                    <option value='2'>
                                                        2 - Fair
                                                    </option>
                                                    <option value='3'>
                                                        3 - Good
                                                    </option>
                                                    <option value='4'>
                                                        4 - Very Good
                                                    </option>
                                                    <option value='5'>
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={reviewLoading}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{' '}
                                            <Link to='/login'>sign in</Link> to
                                            write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            ) : null}
        </>
    );
};
export default ProductDetails;
