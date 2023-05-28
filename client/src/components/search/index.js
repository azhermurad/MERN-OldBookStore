import { useState } from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    return (
        <>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (keyword) {
                        navigate('?search=' + keyword);
                    } else {
                        navigate('/');
                    }
                }}
            >
                <InputGroup size='lg' className='mb-3'>
                    <Form.Control
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                        }}
                        placeholder="Search Product By It's Name"
                    />
                    <Button type='submit' variant='primary'>
                        Search
                    </Button>
                </InputGroup>
            </Form>
        </>
    );
};

export default Search;
