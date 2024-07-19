import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import promotionBanner1 from "../../../assets/images/Banner1.png";
import promotionBanner2 from "../../../assets/images/Banner2.png";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 7000,
    pauseOnFocus: true,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        <div className="h-[200px] sm:h-[300px] md:h-[450px] bg-gray-200">
          <img
            src={promotionBanner1}
            alt="Sample Banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-[200px] sm:h-[300px] md:h-[450px]  bg-gray-200">
          <img
            src={promotionBanner2}
            alt="Sample Banner"
            className="h-full w-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
}
