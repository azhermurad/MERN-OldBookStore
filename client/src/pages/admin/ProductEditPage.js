import { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/Form/FormContainer';
import CustomInputGroup from '../../components/Form/InputGroup';
import Loader from '../../components/loader/Loader';
import BackButton from '../../components/buttons/BackButton';
import Message from '../../components/message/Message';
import {
    fetchProductDetails,
    resetResetProductDetail,
} from '../../store/reducer/productDetailSlice';
import {
    resetCreateProduct,
    updateProduct,
} from '../../store/reducer/productSlice';

const ProductEditPage = () => {
    const { id } = useParams();
    const data = useSelector((state) => state.productDetailState);
    const { user } = useSelector((state) => state.userState);
    const {
        updateProduct: updateproduct,
        loading: updateProductLoading,
        error: updateProductError,
        message: updateProductMessage,
    } = useSelector((state) => state.productState);
    const { product, loading, error, message } = data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (updateproduct) {
            dispatch(resetCreateProduct());
            if (user.isAdmin) {
                navigate('/admin/productlist');
            }else{
                navigate('/profile');
            }
        } else {
            if (!product || product?._id !== id) {
                dispatch(fetchProductDetails(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [id, dispatch, product, updateproduct, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(editUser(id, values.email, values.name,values.admin));
        // navigate("/admin/productlist")
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('countInStock', countInStock);
        formData.append('description', description);
        dispatch(
            updateProduct({
                _id: id,
                formData,
            })
        );
    };

    return (
        <FormContainer>
            <BackButton src={'/admin/productlist'} title={'GO BACK'} />

            <h3 className='pb-2'>Edit</h3>
            {loading ? <Loader /> : error ? <Message text={error} /> : null}
            {updateProductLoading ? (
                <Loader />
            ) : updateProductError ? (
                <Message text={updateProductError} />
            ) : null}
            <Form onSubmit={submitHandler}>
                <CustomInputGroup
                    value={name}
                    label='Name'
                    name='name'
                    type={'text'}
                    placeholder='Enter Your Name'
                    onChangeHandler={(e) => setName(e.target.value)}
                />
                <CustomInputGroup
                    value={price}
                    label='Price'
                    name='pruce'
                    type={'text'}
                    placeholder='Enter Your Email Address'
                    onChangeHandler={(e) => setPrice(e.target.value)}
                />

                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* <Form.Group controlId='brand'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                </Form.Group> */}

                <Form.Group controlId='formFile' className='mb-3'>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter countInStock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    className='btn btn-primary'
                    disabled={!name || !brand}
                >
                    {false ? (
                        <>
                            {' '}
                            <Spinner
                                as='span'
                                animation='grow'
                                size='sm'
                                role='status'
                                aria-hidden='true'
                            />
                            Loading...
                        </>
                    ) : (
                        'Update'
                    )}
                </Button>
            </Form>
        </FormContainer>
    );
};
export default ProductEditPage;
