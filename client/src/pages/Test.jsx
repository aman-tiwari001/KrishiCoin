import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"; // Add this for pagination

// Import required Swiper modules
import { Pagination } from "swiper/modules";

export default function Test() {
  return (
    <>
      <Swiper
        className="mySwiper bg-red-500"
        slidesPerView={1}  // Ensure at least 1 slide is visible
        spaceBetween={10}  // Add spacing between slides
        pagination={{ clickable: true }} // Enable pagination
        modules={[Pagination]} // Register the Pagination module
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
