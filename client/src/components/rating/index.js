import React from "react";
import PropTypes from "prop-types";

const Rating = ({ rating, numReviews, color }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <i
          key={value}
          style={{ color }}
          className={
            rating >= value
              ? "fas fa-star"
              : rating >= value - 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      ))}
     {numReviews &&  <span>{" "}{numReviews} Reviews</span>}
    </div>
  );
};

// we can define the defautProps
Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number,
  color: PropTypes.string,
};
export default Rating;
