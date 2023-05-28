import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';
import UserTable from '../components/user/UserTable';
import { deleteUser, getUserList } from '../store/reducer/adminSlice';


const UserListPage = () => {
    const navigate = useNavigate();
    const { userList, loading, error } = useSelector(
        (state) => state.adminState
    );
    const { user } = useSelector((state) => state.userState);

    const dispatch = useDispatch();
    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getUserList());
        } else {
            navigate('/login');
        }   
    }, [dispatch, user, navigate]);

    const deleteHandler = (id) => {
        if(window.confirm("Are You Sure!")){
            dispatch(deleteUser(id))
        }
    };
    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message text={error} />
            ) : (
                <UserTable list={userList} deleteHandler={deleteHandler} />
            )}
        </>
    );
};
// the main idea of the ifea of the life that the best solution that the mai




// thre=]
export default UserListPage;   
