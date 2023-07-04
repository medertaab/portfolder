import Slide1 from "./hero_components/Slide1";
import Slide2 from "./hero_components/Slide2";
import Slide3 from "./hero_components/Slide3";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function HeroCarousel() {
  return (
    <Swiper
      slidesPerView={1}
      className="max-w-[38rem]"
      modules={[Pagination, Autoplay]}
      autoplay={{delay: 4000}}
      pagination={true}
      loop={true}
    >
      <SwiperSlide>
        <Slide1 />
      </SwiperSlide>
      <SwiperSlide>
        <Slide2 />
      </SwiperSlide>
      <SwiperSlide>
        <Slide3 />
      </SwiperSlide>
    </Swiper>
  );
}
