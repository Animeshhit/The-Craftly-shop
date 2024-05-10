import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const Hero = () => {
  return (
    <>
      <Swiper
        className="max-w-screen-2xl mx-auto sm:h-[540px] h-[400px]"
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        modules={[Pagination]}
      >
        <SwiperSlide className="hero__slider">
          <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </SwiperSlide>
        <SwiperSlide className="hero__slider">
          <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </SwiperSlide>

        <SwiperSlide className="hero__slider">
          <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Hero;
