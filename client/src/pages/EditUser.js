import { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/Form/FormContainer';
import CustomInputGroup from '../components/Form/InputGroup';
import Message from '../components/message/Message';
import Loader from '../components/loader/Loader';
import { editUser, getSingleUser } from '../store/reducer/adminSlice';
import BackButton from '../components/buttons/BackButton';

const EditUser = () => {
    const { id } = useParams();
    const { user, loading, error, message } = useSelector(
        (state) => state.adminState
    );
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: '',
        email: '',
        admin: false,
    });

    console.log(values)
    useEffect(() => {
        console.log(user);
        if (!user || user._id !== id) {
            dispatch(getSingleUser(id));
        } else {
            setValues({
                name: user.name,
                email: user.email,
                admin: user.isAdmin,
            });
        }
    }, [id, user, dispatch]);

    const onChangeHandler = (e) => {
        console.log(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('this is the id of the user', id, values);
        dispatch(editUser(id, values.email, values.name,values.admin));
        navigate("/admin/userlist")
        
    };

    return (
        <FormContainer>
            <BackButton src={'/admin/userlist'} title={'GO BACK'} />

            <h3 className='pb-2'>Edit</h3>
            {loading ? <Loader /> : error ? <Message text={error} /> : null}
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

                <Form.Group className='mb-3'>
                    <Form.Check
                        type='switch'
                        id='admin'
                        name='admin'
                        label='Admin Role'
                        checked={values.admin}
                        onChange={(e) => {
                            setValues({ ...values, admin: e.target.checked });
                        }}
                    />
                </Form.Group>

                <Button
                    type='submit'
                    className='btn btn-primary'
                    disabled={!values.email || !values.name}
                >
                    {loading ? (
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
export default EditUser;
