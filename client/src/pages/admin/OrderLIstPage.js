import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import Message from '../../components/message/Message';
import UserTable from '../../components/user/UserTable';
import { getOrderListByAdmin } from '../../store/reducer/orderSlice';

const AdminOrderListPage = () => {
    const navigate = useNavigate();
    const { adminOrders, loading, error } = useSelector(
        (state) => state.orderState
    );
    const { user } = useSelector((state) => state.userState);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getOrderListByAdmin());
        } else {
            navigate('/login');
        }
    }, [dispatch, user, navigate]);

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message text={error} />
            ) : (
                <UserTable table='order' list={adminOrders} />
            )}
        </>
    );
};

export default AdminOrderListPage;
