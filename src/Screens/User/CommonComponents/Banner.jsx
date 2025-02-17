import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Removed Navigation
import "swiper/css";
import "swiper/css/pagination";

// Import banner images
import img1 from "../../../Assets/Images/Banner.jpg";
import img2 from "../../../Assets/Images/Banner.jpg";
import img3 from "../../../Assets/Images/Banner.jpg";

const images = [img1, img2, img3];

const Banner = () => {
  return (
    <div className="banner-carousel">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]} // Removed Navigation module
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

