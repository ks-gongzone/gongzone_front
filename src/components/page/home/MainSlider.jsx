import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sampleBanner from "../../../assets/images/sampleBanner.PNG";

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
        <div className="h-[450px] bg-gray-200">
          <img
            src={sampleBanner}
            alt="Sample Banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-[450px] bg-gray-200">
          <img
            src={sampleBanner}
            alt="Sample Banner"
            className="h-full w-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
}
