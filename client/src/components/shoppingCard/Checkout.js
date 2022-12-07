import { Button, Col, Card, Row, Badge } from 'react-bootstrap';
import ProductDetaiList from '../product/product_details/ProductDetailLIst';

const Checkout = ({ cardItems }) => {
    return (
        <Card>
            <ProductDetaiList
                items={[
                    <Row>
                        <Col>
                            <strong>ITEMS:</strong>
                        </Col>
                        <Col>
                            {' '}
                            <Badge className='p-2' bg='dark'>
                                {cardItems.reduce((x, item) => x + item.qty, 0)}
                            </Badge>
                        </Col>
                    </Row>,
                    <Row>
                        <Col>
                            <strong>TOTAL:</strong>
                        </Col>
                        <Col>
                            $
                            {cardItems
                                .reduce(
                                    (x, item) => x + item.qty * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </Col>
                    </Row>,
                    <div className='d-grid gap-2'>
                        <Button type='button' disabled={cardItems.length === 0}>
                            Proceed To Checkout
                        </Button>
                    </div>
                ]}
            />
        </Card>
    );
};

export default Checkout;
