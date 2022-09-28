import { useLocation, useParams } from 'react-router-dom';

const CardPage = (props) => {
    const { id } = useParams();
    const { search } = useLocation();
    const qty = Number(search.split("=")[1])
    return id ? id : <h1>Card</h1>;
};
export default CardPage;
