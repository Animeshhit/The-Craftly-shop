//core modules
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

//swiper modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

//others modules
import axios from "axios";

const Hero = () => {
  const [banners, setBanners] = useState(null);
  const [MainBanner, setMainBanner] = useState(null);

  const getAllBannersImages = async () => {
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/banners`)
        .then((res) => {
          let { data } = res;
          data.map((item) => {
            if (item.isMainImage) {
              setMainBanner(item);
            }
            setBanners(data);
          });
        })
        .catch((err) => {
          console.log(err);
          setBanners([]);
          setMainBanner(false);
          //toast
          alert(err.message);
        });
    } catch (err) {
      alert("NetWork Connection Error");
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
        className="w-full mx-auto h-[200px] md:h-[400px]"
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
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse rounded-lg"></SwiperSlide>
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse rounded-lg"></SwiperSlide>
            <SwiperSlide className="hero__slider bg-zinc-900 animate-pulse rounded-lg"></SwiperSlide>
          </>
        ) : banners.length > 0 ? (
          <>
            {MainBanner && MainBanner ? (
              <SwiperSlide>
                <NavLink to={MainBanner.bannerLink} className="w-full h-full">
                  {" "}
                  <img
                    loading="lazy"
                    decoding="auto"
                    className={`w-full h-full object-cover blur bg-zinc-900 object-center rounded-lg`}
                    src={MainBanner.bannerImage}
                    onLoad={(e) => e.target.classList.add("loaded")}
                  />
                </NavLink>
              </SwiperSlide>
            ) : (
              ""
            )}
            {banners.map((item, key) => {
              if (!item.isMainImage) {
                return (
                  <SwiperSlide key={key}>
                    <NavLink to={item.bannerLink} className="w-full h-full">
                      <img
                        loading="lazy"
                        decoding="auto"
                        className={`w-full h-full object-cover blur bg-zinc-900 object-center rounded-lg`}
                        src={item.bannerImage}
                        onLoad={(e) => e.target.classList.add("loaded")}
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
