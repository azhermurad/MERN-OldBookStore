import { Form } from 'react-bootstrap';
const CustomInputGroup = ({label,name,type,placeholder,onChangeHandler}) => {
    return (
        <Form.Group className='mb-3'>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChangeHandler}
            />
        </Form.Group>
    );
};

export default CustomInputGroup;
