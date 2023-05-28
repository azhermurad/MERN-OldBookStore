import { Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../rating";
import "./product.css"
const Product = ({ product }) => {
  return (
    <>
      <Card className="rounded my-3">
        {/* <Card.Img variant="top" src={product.image} /> */}
        <Carousel>
          <Carousel.Item>
            <Card.Img variant="top" src={product.image} />
          </Carousel.Item>
          <Carousel.Item>
            <Card.Img variant="top" src={product.image} />
          </Carousel.Item>
        </Carousel>
        <Card.Body className="product-card_body">
          <Link to={"products/" + product._id} >
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text className="py-3" as="div">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </Card.Text>
          <Card.Text as="h3">PKR {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default Product;
