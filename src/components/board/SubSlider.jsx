import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SubSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 7000,
    pauseOnFocus: true,
  };

  return (
    <div className="w-full">
      <div className="w-[730px] mx-auto mt-10 mb-6 text-lg font-bold text-[#526688]">
        마감임박 모임
      </div>
      <Slider {...settings}>
        <div className="h-[200px] bg-gray-200">
          <h3>1</h3>
        </div>
        <div className="h-[200px] bg-gray-200">
          <h3>2</h3>
        </div>
        <div className="h-[200px] bg-gray-200">
          <h3>3</h3>
        </div>
        <div className="h-[200px] bg-gray-200">
          <h3>4</h3>
        </div>
        <div className="h-[200px] bg-gray-200">
          <h3>5</h3>
        </div>
        <div className="h-[200px] bg-gray-200">
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}
