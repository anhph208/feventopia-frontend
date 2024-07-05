import React from 'react';
import PropTypes from 'prop-types';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const responsive = {
  0: {
    items: 1,
  },
  464: {
    items: 1,
  },
  1024: {
    items: 1,
  },
};

const Slider = ({ items, autoplayTimeout, loop, margin, smartSpeed }) => {
  return (
    <div className="slider-container">
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
        freeDrag={false} // Disable free drag
      >
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="slider-container">
              <a href={item.link}>
                <img src={item.image} alt={item.altText} />
              </a>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}

Slider.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      altText: PropTypes.string.isRequired,
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
