import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import subBanner1 from "../../../assets/images/subBanner1.png";
import subBanner2 from "../../../assets/images/subBanner2.png";

export default function SubSlider() {
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
    <div className="w-[30em] md:w-[50em] xl:w-[63em]">
      <div className="mx-auto mt-10 mb-6 text-lg font-bold text-[#526688]">
        다양한 소식
      </div>
      <div>
        <Slider {...settings}>
          <div className="h-[80px] sm:h-[100px] md:h-[120px] bg-gray-200">
            <img
              src={subBanner1}
              alt="Sample Banner"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[80px] sm:h-[100px] md:h-[120px] bg-gray-200">
            <img
              src={subBanner2}
              alt="Sample Banner"
              className="h-full w-full object-cover"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
