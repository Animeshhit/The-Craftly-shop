import { Swiper, SwiperSlide } from "swiper/react";
import { baseApiURL } from "../../config/api";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const Hero = () => {
  const [banners, setBanners] = useState(null);
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
      alert(err.message);
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
          <h2>Loading..</h2>
        ) : banners.length > 0 ? (
          banners.map((item, key) => (
            <SwiperSlide key={key} className="hero__slider">
              <img src={item.bannerImage} />
            </SwiperSlide>
          ))
        ) : (
          <h2>no banners image found</h2>
        )}
      </Swiper>
    </>
  );
};

export default Hero;
