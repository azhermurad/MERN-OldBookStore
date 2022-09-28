import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BackButton = ({ src, title }) => {
  return (
    <Link to={src}>
      <Button className="fw-bold" variant="light">
        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
        {title}
      </Button>
    </Link>
  );
};
export default BackButton;
