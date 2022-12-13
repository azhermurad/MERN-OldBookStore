import { useEffect, useState } from 'react';
import { Col, Form, Row, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/Form/FormContainer';
import CustomInputGroup from '../components/Form/InputGroup';
import Message from '../components/message/Message';
import { loginUsers } from '../store/reducer/userSlice';
const LoginPage = () => {
    const data = useSelector((state) => state.userState);
    const  location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const redirect = location.search
        ? location.search.split('=')[1]
        : '/profile';
    useEffect(() => {
        if (data.user) {
            navigate(redirect);
        }
    }, [navigate, redirect, data.user]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUsers(values.email, values.password));
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
                    disabled={!values.email || !values.password}
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
                        'Login'
                    )}
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ?{' '}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : '/register'
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
export default LoginPage;
// the best solution is that we have to make the solution
