import { useState } from 'react';
import { Col, Container, Form, Row, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputGroup from '../components/Form/InputGroup';
import Message from '../components/message/Message';
import { createhUsers } from '../store/reducer/userSlice';

const LoginPage = () => {
    const data = useSelector((state) => state.userState);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    console.log(values, data);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createhUsers(values.email, values.password));
    };
    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h2>Sign In</h2>
                    {data.error ? <Message text={data.error} /> : null}
                    <Form onSubmit={submitHandler}>
                        <CustomInputGroup
                            label='Email'
                            name='email'
                            type={'email'}
                            placeholder='Enter Your Email Address'
                            onChangeHandler={onChangeHandler}
                        />
                        <CustomInputGroup
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
                                'Submit'
                            )}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
export default LoginPage;
// the best solution is that we have to make the solution
