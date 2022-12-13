import { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomInputGroup from '../components/Form/InputGroup';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';
import { getUserProfile, updateUserProfile } from '../store/reducer/userSlice';

const UserProfilePage = () => {
    const data = useSelector((state) => state.userState);
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
        if (!data.userProfile) {
            dispatch(getUserProfile());
        } else {
            setValues({
                name: data.userProfile.name,
            });
        }
    }, [navigate, data.user, data.userProfile, dispatch]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(values.name, values.password));
    };

    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <Row>
            <Col md={3}>
                <h3 className='pb-2'>Profile</h3>
                {data.loading && <Loader />}

                {data.error ? <Message text={data.error} dismissible /> : null}
                {data.message && (
                    <Message variant='success' text={data.message} dismissible />
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
            <Col md={9}>Orders</Col>
        </Row>
    );
};
export default UserProfilePage;
