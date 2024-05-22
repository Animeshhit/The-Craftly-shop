import { Swiper, SwiperSlide } from "swiper/react";
import { baseApiURL } from "../../config/api";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const Hero = () => {
  const [banners, setBanners] = useState(null);
  const [imageLoad, setImageLoad] = useState(true);

  const getAllBannersImages = async () => {
    try {
      let APIREQ = await fetch(`${baseApiURL}/banners`);
      let APIRES = await APIREQ.json();

      if (APIREQ.status == 200) {
        setBanners(APIRES);
      } else {
        alert(APIRES.message);
        setBanners([]);
      }
    } catch (err) {
      // alert("NetWork Connection Error");
      console.log(err);
      setBanners([]);
    }
  };
  useEffect(() => {
    getAllBannersImages();
  }, []);
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
        {banners == null ? (
          <>
            {" "}
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse"></SwiperSlide>
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse"></SwiperSlide>
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse"></SwiperSlide>
          </>
        ) : banners.length > 0 ? (
          banners.map((item, key) => (
            <SwiperSlide key={key} className="hero__slider">
              <img
                loading="lazy"
                decoding="auto"
                className={`${imageLoad ? "blur-md" : ""}`}
                onLoad={() => {
                  setImageLoad(false);
                }}
                src={item.bannerImage}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="flex items-center justify-center bg-zinc-900">
            <h2 className="font-Karla text-white text-xl">No Banners Found</h2>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default Hero;
