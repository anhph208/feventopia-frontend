import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

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

const Slider = () => {
  return (
    <div>
      <OwlCarousel
        className="owl-theme"
        loop
        margin={10}
        responsive={responsive}
        autoplay
        autoplayTimeout={3000}
        smartSpeed={700}
      >
        <div className="item">
          <div className="sponsor">
            <a href="#">
              <img src="./assets/images/icons/sponsor-1.png" alt="Sponsor 1" />
            </a>
          </div>
        </div>
        <div className="item">
          <div className="sponsor">
            <a href="#">
              <img src="./assets/images/icons/sponsor-2.png" alt="Sponsor 2" />
            </a>
          </div>
        </div>
        <div className="item">
          <div className="sponsor">
            <a href="#">
              <img src="./assets/images/icons/sponsor-3.png" alt="Sponsor 3" />
            </a>
          </div>
        </div>
        <div className="item">
          <div className="sponsor">
            <a href="#">
              <img src="./assets/images/icons/sponsor-4.png" alt="Sponsor 4" />
            </a>
          </div>
        </div>
        <div className="item">
          <div className="sponsor">
            <a href="#">
              <img src="./assets/images/icons/sponsor-5.png" alt="Sponsor 5" />
            </a>
          </div>
        </div>
        <div className="item">
          <div className="sponsor">
            <a href="#">
              <img src="./assets/images/icons/sponsor-6.png" alt="Sponsor 6" />
            </a>
          </div>
        </div>
        <div className="item">
          <div className="sponsor">
            <a href="#">
              <img src="./assets/images/icons/sponsor-7.png" alt="Sponsor 7" />
            </a>
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
}

export default Slider;
