import { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Table,
    Tabs,
    Tab,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomInputGroup from '../components/Form/InputGroup';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';
import { deleteOrder, getUserOrderList } from '../store/reducer/orderSlice';
import { getUserProfile, updateUserProfile } from '../store/reducer/userSlice';
import {
    createProduct,
    resetCreateProduct,
    deleteProduct,
} from '../store/reducer/productSlice';
import UserTable from '../components/user/UserTable';

const UserProfilePage = () => {
    const data = useSelector((state) => state.userState);
    const orders = useSelector((state) => state.orderState);
    const pro = useSelector((state) => state.productState);
    const { createProduct: cp } = pro;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        name: '',
        password: '',
    });

    useEffect(() => {
        if (!data.user) {
            navigate('/login');
            return;
        }
        dispatch(resetCreateProduct());
        if (cp) {
            navigate(`/admin/product/${cp?._id}/edit`);
        } else {
            if (!data.userProfile || !orders.myOrders) {
                dispatch(getUserProfile());
                dispatch(getUserOrderList());
            } else {
                setValues({
                    name: data.userProfile.name,
                    password: data.userProfile.password,
                });
            }
        }
    }, [navigate, data.user, data.userProfile, orders.myOrders, dispatch, cp]);

    const deleteProductHandler = (id) => {
        if (window.confirm('Are You Sure!')) {
            dispatch(deleteProduct(id));
            dispatch(getUserProfile());
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(values.name, values.password));
    };
    const deleteHandler = (id) => {
        dispatch(deleteOrder(id));
    };
    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const sellBookHanlder = () => {
        dispatch(createProduct());
    };
    return (
        <Row>
            <Col md={3}>
                <h3 className='pb-2'>Profile</h3>
                {data.loading && <Loader />}

                {data.error ? <Message text={data.error} dismissible /> : null}
                {data.message && (
                    <Message
                        variant='success'
                        text={data.message}
                        dismissible
                    />
                )}
                <Form onSubmit={submitHandler}>
                    <CustomInputGroup
                        value={data?.userProfile?.email || ''}
                        label='Email'
                        name='email'
                        type={'email'}
                        onChangeHandler={() => {}}
                        disabled
                    />
                    <CustomInputGroup
                        value={values.name || ''}
                        label='Name'
                        name='name'
                        type={'text'}
                        placeholder='Enter Your Name'
                        onChangeHandler={onChangeHandler}
                    />
                    <CustomInputGroup
                        value={values.password || ''}
                        label='Password'
                        name='password'
                        type={'password'}
                        placeholder='Enter Your Password'
                        onChangeHandler={onChangeHandler}
                    />
                    <Button
                        type='submit'
                        className='btn btn-primary'
                        disabled={!values.password || !values.name}
                    >
                        {values.loading ? (
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
            </Col>
            <Col md={9} style={{ position: 'relative' }}>
                {!data?.userProfile?.isAdmin && (
                    <Button
                        className='my-3'
                        onClick={sellBookHanlder}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                        }}
                    >
                        <i className='fa fa-plus mx-1'> </i>
                        Sell Book
                    </Button>
                )}
                <Tabs
                    defaultActiveKey='Orders'
                    id='fill-tab-example'
                    className='mb-3 justify-content-center'
                    fill
                    onSelect={() => {
                        dispatch(getUserProfile());
                    }}
                >
                    <Tab eventKey='Orders' title='Orders'>
                        {orders?.loading ? (
                            <Loader />
                        ) : orders?.error ? (
                            <Message text={orders.error} />
                        ) : null}
                        {orders?.myOrders?.length > 0 ? (
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className='table-sm'
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.myOrders?.map((item) => (
                                        <tr>
                                            <td>{item._id}</td>
                                            <td>
                                                {item.createdAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </td>
                                            <td>${item.totalPrice}</td>
                                            <td>
                                                {item.isPaid ? (
                                                    item.paidAt.substring(0, 10)
                                                ) : (
                                                    <i className='fa fa-circle-xmark text-danger'></i>
                                                )}
                                            </td>
                                            <td>
                                                {item.isDelivered ? (
                                                    item.deliveredAt.substring(
                                                        0,
                                                        10
                                                    )
                                                ) : (
                                                    <i class='fa fa-circle-xmark text-danger'></i>
                                                )}
                                            </td>
                                            <td>
                                                <Button
                                                    variant='light'
                                                    className='btn-sm  text-danger '
                                                    onClick={() => {
                                                        deleteHandler(item._id);
                                                    }}
                                                >
                                                    <i className='fa fa-trash fa-lg' />
                                                </Button>
                                            </td>
                                            <td>
                                                <LinkContainer
                                                    to={`/order/${item._id}`}
                                                >
                                                    <Button variant='light'>
                                                        Details
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <Message text={'No Orders'} />
                        )}
                    </Tab>
                    <Tab eventKey='Products' title='Products'>
                        {data?.userProfile?.products?.length > 0 ? (
                            <UserTable
                                table='product'
                                list={data?.userProfile?.products}
                                deleteHandler={deleteProductHandler}
                            />
                        ) : (
                            <Message text={'No Products'} />
                        )}
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    );
};
export default UserProfilePage;
