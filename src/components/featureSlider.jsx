// Slider.js
import React from "react";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const responsive = {
  0: {
    items: 1,
  },
  464: {
    items: 3,
  },
  1024: {
    items: 5,
  },
};

const Slider = ({ items, autoplayTimeout, loop, margin, smartSpeed }) => {
  return (
    <div>
      <OwlCarousel
        className="owl-theme"
        loop={loop}
        margin={margin}
        responsive={responsive}
        autoplay
        autoplayTimeout={autoplayTimeout}
        smartSpeed={smartSpeed}
        nav={false} // Disable navigation arrows
        dots={false} // Disable dots navigation
        mouseDrag={false} // Disable mouse drag
        touchDrag={false} // Disable touch drag
        pullDrag={false} // Disable pull drag
        freeDrag={false}
      >
        {items.map((item, index) => (
            <div className="item" key={index}>
              <div className="main-card">
                <div className="host-item">
                  <div className="host-img">
                    <img src={item.image} alt={item.altText} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

Slider.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      altText: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  autoplayTimeout: PropTypes.number,
  loop: PropTypes.bool,
  margin: PropTypes.number,
  smartSpeed: PropTypes.number,
};

Slider.defaultProps = {
  autoplayTimeout: 3000,
  loop: true,
  margin: 10,
  smartSpeed: 700,
};

export default Slider;
