import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
// import Loader from '../components/loader/Loader';
import Message from '../../components/message/Message';
import UserTable from '../../components/user/UserTable';
import {
    createProduct,
    deleteProduct,
    fetchAllPosts,
    resetCreateProduct,
} from '../../store/reducer/productSlice';
import PaginationBasic from '../../components/pagination';

const ProductListPage = () => {
    const { search } = useLocation();
    const pageNumber = new URLSearchParams(search).get('pageNumber') || 1;
    const navigate = useNavigate();
    const data = useSelector((state) => state.productState);
    const {
        prodcuts,
        loading,
        error,
        createProduct: cp,
        page,
        pages,
    } = data;
    console.log(error);
    const { user } = useSelector((state) => state.userState);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetCreateProduct());
        if (!user && !user.isAdmin) {
            navigate('/login');
        }

        if (cp) {
            navigate(`/admin/product/${cp?._id}/edit`);
        } else {
            dispatch(fetchAllPosts({ keyword: '', pageNumber:pageNumber  }));
        }
    }, [dispatch, user, navigate, cp,pageNumber]);

    const deleteHandler = (id) => {
        if (window.confirm('Are You Sure!')) {
            dispatch(deleteProduct(id));
        }
    };
    console.log(prodcuts);
    const createProductHandler = () => {
        alert('product is created successfullY');
        dispatch(createProduct());
    };
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fa fa-plus mx-1'> </i>
                        Create Product
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message text={error} />
            ) : prodcuts.length === 0 ? (
                <Message variant='success' text={'No Product Found!'} />
            ) : (
                <>
                    <UserTable
                        table='product'
                        list={prodcuts}
                        deleteHandler={deleteHandler}
                    />
                    <PaginationBasic
                        page={page}
                        pages={pages}
                        keyword={""}
                    />
                </>
            )}
        </>
    );
};

export default ProductListPage;
