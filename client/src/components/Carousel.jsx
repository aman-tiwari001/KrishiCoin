import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper modules
import { Autoplay, EffectCards, Pagination } from "swiper/modules";

export default function Carousel({ images }) {
  return (
    <div>
      <Swiper
        effect={"cards"}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCards, Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom w-[90%] md:w-[400px] h-[350px] ">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
