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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Swiper
        className="w-full h-[350px] sm:h-[600px] mx-auto"
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
            <SwiperSlide className="hero__slider w-full h-[350px] sm:h-[600px] bg-zinc-300 animate-pulse rounded-lg"></SwiperSlide>
            <SwiperSlide className="hero__slider w-full h-[350px] sm:h-[600px] bg-zinc-300 animate-pulse rounded-lg"></SwiperSlide>
            <SwiperSlide className="hero__slider w-full h-[350px] sm:h-[600px] bg-zinc-300 animate-pulse rounded-lg"></SwiperSlide>
          </>
        ) : banners.length > 0 ? (
          <>
            {MainBanner && MainBanner ? (
              <SwiperSlide
                className={`w-full h-[350px] rounded-lg sm:h-[600px] bg-zinc-300`}
              >
                <NavLink
                  to={MainBanner.bannerLink}
                  className="w-full h-[350px] sm:h-[600px]"
                >
                  {" "}
                  <img
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-[350px] sm:h-[600px] object-cover blur opacity-0 object-center rounded-lg`}
                    src={
                      windowWidth <= 500
                        ? MainBanner.phoneBannerImage
                        : MainBanner.bannerImage
                    }
                    onLoad={(e) => {
                      e.target.classList.add("loaded");
                    }}
                  />
                </NavLink>
              </SwiperSlide>
            ) : (
              ""
            )}
            {banners.map((item, key) => {
              if (!item.isMainImage) {
                return (
                  <SwiperSlide
                    className={`w-full h-[350px] rounded-lg sm:h-[600px]  bg-zinc-300`}
                    key={key}
                  >
                    <NavLink
                      to={item.bannerLink}
                      className="w-full h-[350px] sm:h-[600px]"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-[350px] sm:h-[600px] object-cover blur opacity-0 object-center rounded-lg`}
                        src={
                          windowWidth <= 500
                            ? item.phoneBannerImage
                            : item.bannerImage
                        }
                        onLoad={(e) => {
                          e.target.classList.add("loaded");
                        }}
                      />
                    </NavLink>
                  </SwiperSlide>
                );
              }
            })}
          </>
        ) : (
          <SwiperSlide className="flex h-[350px] rounded-lg sm:h-[600px] items-center justify-center bg-zinc-900">
            <h2 className="font-Karla text-white text-xl">No Banners Found</h2>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default Hero;
