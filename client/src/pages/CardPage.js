import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import Message from '../components/message/Message';
import { fetchProductById } from '../store/reducer/cardReducer';

const CardPage = (props) => {
    const { id } = useParams();
    const { search } = useLocation();
    const qty = Number(search.split('=')[1]);
    const card = useSelector((state) => state.cardState);
    const dispatch = useDispatch();
    const { cardItems,message,error,loading } = card;
    

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById({ id, qty }));
        }
    }, [dispatch, id, qty]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : false ? (
                <Message text={error} close={()=>{
                    
                }} />
            ) : message ? (
                <Message text={message} variant='success' />
            ) : (
                cardItems.map(()=><h3>card</h3>)
            )}
        </>
    );
};
export default CardPage;
