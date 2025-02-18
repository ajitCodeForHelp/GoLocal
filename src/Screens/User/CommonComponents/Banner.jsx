import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";

// Import banner images
import img1 from "../../../Assets/Images/Banner.jpg";
import img2 from "../../../Assets/Images/Banner.jpg";
import img3 from "../../../Assets/Images/Banner.jpg";

const images = [img1, img2, img3];

const Banner = () => {
  return (
    <div className="container-fluid px-0 banner-carousel">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="img-fluid slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;


