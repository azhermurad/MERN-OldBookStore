import { useEffect, useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../components/checkout/CheckoutStep';
import FormContainer from '../components/Form/FormContainer';
import { addPaymentMethod } from '../store/reducer/cardReducer';

const PaymentPage = () => {
    const { shippingAddress,paymentMethod } = useSelector((state) => state.cardState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payment, setPaymentMethod] = useState('Stripe');
    

   useEffect(()=>{
    if(Object.keys(shippingAddress).length === 0){
        navigate("/shipping")
    }
   },[])
console.log(payment)
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addPaymentMethod(payment));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h3 className='pb-2'>Payment</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Payment Method:</Form.Label>
                    <Form.Check
                        className='mb-3'
                        type='radio'
                        label={`PayPal`}
                        name='paymentMethod'
                        defaultChecked
                        value='PayPal'
                        id='PayPal'
                        onChange={(e) => {
                            setPaymentMethod(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Check
                    type='radio'
                    label={`Credit Card`}
                    name='paymentMethod'
                    value='Stripe'
                    id='Stripe'
                    onChange={(e) => {
                        setPaymentMethod(e.target.value);
                    }}
                />
                <Button type='submit' className='btn btn-primary' disabled={!payment}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};
export default PaymentPage;
