import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ImageSlider.css";

// import required modules
import { Zoom, Navigation, Pagination } from "swiper/modules";

export default function ImageSlider({ swiperRef, setcurrentSlide, Images }) {
  return (
    <>
      <div className="image__slider__main">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          zoom={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Zoom, Navigation, Pagination]}
          className="mySwiper"
          ref={swiperRef}
          onSlideChange={(swiper) => {
            setcurrentSlide(swiper.activeIndex);
          }}
        >
          {Images.map((item, key) => (
            <SwiperSlide className="bg-zinc-800" data-id={key}>
              <div className="swiper-zoom-container">
                <img
                  src={item}
                  loading="lazy"
                  className="bg-zinc-800 blur"
                  onLoad={(e) => {
                    e.target.classList.add("loaded");
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
