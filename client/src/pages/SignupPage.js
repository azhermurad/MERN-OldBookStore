import { useEffect, useState } from 'react';
import { Row, Col,Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/Form/FormContainer';
import CustomInputGroup from '../components/Form/InputGroup';
import Message from '../components/message/Message';
import { createUser } from '../store/reducer/userSlice';

const SignupPage = () => {
    const data = useSelector((state) => state.userState);
    let location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })

    const redirect = location.search
        ? location.search.split('=')[1]
        : '/';

    useEffect(() => {
        if (data.user) {
            navigate(redirect);
        }
    }, [navigate, redirect, data.user]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(loginUsers(values.email, values.password));
        dispatch(createUser(values.name, values.email, values.password));
    };
    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <FormContainer>
            <h3 className='pb-2'>Sign In</h3>
            {data.error ? <Message text={data.error} /> : null}
            <Form onSubmit={submitHandler}>
            <CustomInputGroup
                    value={values.name}
                    label='Name'
                    name='name'
                    type={'text'}
                    placeholder='Enter Your Name'
                    onChangeHandler={onChangeHandler}
                />
                <CustomInputGroup
                    value={values.email}
                    label='Email'
                    name='email'
                    type={'email'}
                    placeholder='Enter Your Email Address'
                    onChangeHandler={onChangeHandler}
                />
                <CustomInputGroup
                    value={values.password}
                    label='Password'
                    name='password'
                    type={'password'}
                    placeholder='Enter Your Password'
                    onChangeHandler={onChangeHandler}
                />
                <Button
                    type='submit'
                    className='btn btn-primary'
                    disabled={!values.email || !values.password || !values.name}
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
                        'Register'
                    )}
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    We Have Account ?{' '}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    >
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
export default SignupPage;
