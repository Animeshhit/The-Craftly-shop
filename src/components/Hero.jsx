import { Swiper, SwiperSlide } from "swiper/react";
import { baseApiURL } from "../../config/api";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const [banners, setBanners] = useState(null);
  const [imageLoad, setImageLoad] = useState(true);
  const [MainBanner, setMainBanner] = useState(null);

  const getAllBannersImages = async () => {
    try {
      let APIREQ = await fetch(`${baseApiURL}/banners`);
      let APIRES = await APIREQ.json();

      if (APIREQ.status == 200) {
        APIRES.map((item) => {
          if (item.isMainImage) {
            setMainBanner(item);
          }
        });
        setBanners(APIRES);
      } else {
        alert(APIRES.message);
        setBanners([]);
        setMainBanner(false);
      }
    } catch (err) {
      // alert("NetWork Connection Error");
      console.log(err);
      setBanners([]);
      setMainBanner(false);
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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {banners == null ? (
          <>
            {" "}
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse"></SwiperSlide>
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse"></SwiperSlide>
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse"></SwiperSlide>
          </>
        ) : banners.length > 0 ? (
          <>
            {MainBanner && MainBanner ? (
              <SwiperSlide className="hero__slider">
                <NavLink to={MainBanner.bannerLink}>
                  {" "}
                  <img
                    loading="lazy"
                    decoding="auto"
                    className={`${imageLoad ? "blur-md" : ""}`}
                    onLoad={() => {
                      setImageLoad(false);
                    }}
                    src={MainBanner.bannerImage}
                  />
                </NavLink>
              </SwiperSlide>
            ) : (
              ""
            )}
            {banners.map((item, key) => {
              if (!item.isMainImage) {
                return (
                  <SwiperSlide key={key} className="hero__slider">
                    <NavLink to={item.bannerLink}>
                      <img
                        loading="lazy"
                        decoding="auto"
                        className={`${imageLoad ? "blur-md" : ""}`}
                        onLoad={() => {
                          setImageLoad(false);
                        }}
                        src={item.bannerImage}
                      />
                    </NavLink>
                  </SwiperSlide>
                );
              }
            })}
          </>
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
