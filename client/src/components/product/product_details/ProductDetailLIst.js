import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ProductDetaiList = ({ items }) => {
    return (
        <ListGroup variant='flush'>
            {items.map((value,index) => {
              return  <ListGroupItem key={index}>{value}</ListGroupItem> }
            )}
        </ListGroup>
    );
};
export default ProductDetaiList;
