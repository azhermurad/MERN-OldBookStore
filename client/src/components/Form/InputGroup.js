import { Form } from 'react-bootstrap';
const CustomInputGroup = (props) => {
    const { value, label, name, type, placeholder, onChangeHandler,disabled,required } = props;
    return (
        <Form.Group className='mb-3'>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChangeHandler}  
                disabled={disabled}    
                required={required}          
            />
           
        </Form.Group>
    );
};

export default CustomInputGroup;
