import { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../components/checkout/CheckoutStep';
import FormContainer from '../components/Form/FormContainer';
import CustomInputGroup from '../components/Form/InputGroup';
import { addShippingAddress } from '../store/reducer/cardReducer';

const ShippigPage = () => {
    const { shippingAddress } = useSelector((state) => state.cardState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        address: shippingAddress.address,
        city: shippingAddress.city,
        postal_code: shippingAddress.postal_code,
        country: shippingAddress.country,
    });

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addShippingAddress(values));
        navigate("/payment")
    };
    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const INPUTFIELDS = [
        {
            value: values.address,
            label: 'Adress',
            name: 'address',
            type: 'text',
            placeholder: 'Enter Your Address',
        },
        {
            value: values.city,
            label: 'City',
            name: 'city',
            type: 'text',
            placeholder: 'Enter Your city',
        },
        {
            value: values.country,
            label: 'Country',
            name: 'country',
            type: 'text',
            placeholder: 'Enter Your Country',
        },
        {
            value: values.postal_code,
            label: 'Postal Code',
            name: 'postal_code',
            type: 'text',
            placeholder: 'Enter Your Postal Code ',
        },
    ];
    return (
        <FormContainer>
            <CheckoutStep step1 step2 />
            <h3 className='pb-2'>shipping</h3>
            <Form onSubmit={submitHandler}>
                {INPUTFIELDS.map(({value,label,name,type,placeholder},index) => (
                    <CustomInputGroup
                        key={index}
                        value={value}
                        label={label}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        onChangeHandler={onChangeHandler}
                        required
                    />
                ))}
                <Button
                    type='submit'
                    className='btn btn-primary'
                    disabled={!values.address || !values.city || !values.country || !values.postal_code}
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};
export default ShippigPage;


// in the shipping page we have store the shipping address in the gobal state and in local storage as well..