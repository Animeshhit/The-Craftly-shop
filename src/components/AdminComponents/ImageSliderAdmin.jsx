import { Swiper, SwiperSlide } from "swiper/react";
import { baseApiURLForAdmin, baseApiURL } from "../../../config/api";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

const ImageSliderAdmin = ({
  isPopupOpen,
  setIsPopupOpen,
  banners,
  setBanners,
  setLoadingProgress,
  data,
  setData,
  edit,
  setEdit,
  editBtnDisabled,
  setEditBtnDisabled,
  deleteBtnDisabled,
  setDeleteBtnDisabled,
}) => {
  const [MainImageDropDown, setMainImageDropDown] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // null ==> loading state
  // [] ==> loading done and no banner found or something went wrong
  // [{..data}] ==> actual data
  // getting all the information from the server
  const getAllBannersImages = async () => {
    try {
      let APIREQ = await fetch(`${baseApiURL}/banners`);
      let APIRES = await APIREQ.json();
      console.log(APIRES);
      if (APIREQ.status == 200) {
        setBanners(APIRES);
        console.log(APIRES);
      } else {
        setBanners([]);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // function for deleting a banner
  const deleteABanner = async (bannerId) => {
    try {
      let token = localStorage.getItem("__token");
      if (!token) return;
      setLoadingProgress(30);
      let APIREQ = await fetch(
        `${baseApiURLForAdmin}/deleteabannerimage?bannerId=${bannerId}&adminapikey=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let APIRES = await APIREQ.json();
      // alert(APIRES.message);
      let updatedBanners = banners.filter((banner) => {
        return banner._id !== bannerId; // Return true for banners with _id not equal to bannerId
      });
      setBanners(updatedBanners);
      setLoadingProgress(70);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setLoadingProgress(100);
    }
  };

  //function for updating the ui
  function updateMainImage(_id) {
    // Find the index of the document with the given _id
    const indexToUpdate = banners.findIndex((banner) => banner._id === _id);

    // If no document with the given _id is found, return
    if (indexToUpdate === -1) {
      console.log("No document found with the given _id.");
      return;
    }

    // Loop through the banners array and update isMainImage property accordingly
    banners.forEach((banner, index) => {
      if (index === indexToUpdate) {
        banner.isMainImage = true;
      } else {
        banner.isMainImage = false;
      }
    });
  }

  //function to set main image
  const setMainImage = async (bannerId) => {
    try {
      let token = localStorage.getItem("__token");
      if (!token) return;
      setLoadingProgress(30);
      setMainImageDropDown(false);
      let APIREQ = await fetch(
        `${baseApiURLForAdmin}/changemainimage?bannerId=${bannerId}&adminapikey=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let APIRES = await APIREQ.json();
      setLoadingProgress(50);
      console.log(APIRES);
      if (APIREQ.status == 200) {
        updateMainImage(bannerId);
      } else {
        alert(APIRES.message);
        console.log(APIRES);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setBanners(banners);
      setLoadingProgress(100);
    }
  };

  const editABannerImage = async ({
    _id,
    bannerImage,
    bannerLink,
    bannerText,
  }) => {
    setIsPopupOpen(true);
    setData({ bannerImage, bannerLink, bannerText });
    setEdit({ mode: true, id: _id });
  };
  useEffect(() => {
    const handleResize = () => {
      // Adjust slidesPerView based on screen width
      if (window.innerWidth < 768) {
        setSlidesPerView(1); // Mobile view
      } else if (window.innerWidth < 992) {
        setSlidesPerView(2); // Tablet view
      } else {
        setSlidesPerView(3); // Default view
      }
    };
    // Call handleResize on initial load
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getAllBannersImages();
  }, []);
  return (
    <>
      <section id="image__slider__editor" className="my-12">
        <div className="container mx-auto sm:px-0 px-4">
          <h1 className="font-bold text-2xl md:text-3xl font-Karla">
            Main Image Slider Editor
          </h1>
          <div className="slider__container mt-6 py-4 rounded-lg">
            <div
              className={`slider__container__header__components ${
                banners && banners.length > 0 ? "flex" : "hidden"
              } items-center justify-start md:justify-end`}
            >
              <div className="main__dropdown__container relative">
                <button
                  onClick={() => {
                    setMainImageDropDown((state) => !state);
                  }}
                  className="text-white bg-zinc-900 hover:bg-zinc-600 rounded-md  px-5 py-2.5 text-center inline-flex items-center text-sm shadow-lg hover:shadow-none transition font-Karla"
                  type="button"
                >
                  Change Main Image{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* <!-- Dropdown menu -- */}
                <div
                  id="dropdown"
                  className={`z-10 ${
                    MainImageDropDown ? "" : "hidden"
                  } absolute mt-3 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {banners && banners.length > 0
                      ? banners.map((item, key) => (
                          <li
                            key={key}
                            className="py-3 px-4 hover:bg-zinc-800 cursor-pointer font-Karla flex items-center justify-center"
                            onClick={() => {
                              setMainImage(item._id);
                            }}
                          >
                            <img
                              src={item.bannerImage}
                              className="w-[100px] object-contain h-[30px]"
                            />
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>
            <Swiper
              className="mt-4"
              pagination={{ dynamicBullets: true }}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              slidesPerView={slidesPerView}
              spaceBetween={30}
              modules={[Pagination, Autoplay]}
            >
              {banners == null ? (
                <>
                  {" "}
                  <SwiperSlide
                    className={`image__slider__loading animate-pulse`}
                  ></SwiperSlide>
                  <SwiperSlide
                    className={`image__slider__loading animate-pulse`}
                  ></SwiperSlide>
                  <SwiperSlide
                    className={`image__slider__loading animate-pulse`}
                  ></SwiperSlide>
                  <SwiperSlide
                    className={`image__slider__loading animate-pulse`}
                  ></SwiperSlide>
                </>
              ) : !(banners.length > 0) ? (
                <SwiperSlide
                  className={`image__slider__nofound flex items-center justify-center`}
                >
                  <p className="text-white">No Banner Found</p>
                </SwiperSlide>
              ) : (
                banners.map((item, key) => (
                  <SwiperSlide
                    key={key}
                    className={`image__slider__editor bg-zinc-500`}
                  >
                    <div className="image__slider__editor__container text-center flex items-center justify-center flex-col rounded-md">
                      <p className="font-Karla font-semibold text-white text-xl py-3">
                        {item.isMainImage ? "Main Image" : ""}
                      </p>
                      <div className="flex items-center gap-4 justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            editABannerImage(item);
                          }}
                          className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                        >
                          <ion-icon name="create"></ion-icon>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteABanner(item._id);
                          }}
                          className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                        >
                          <ion-icon name="trash"></ion-icon>
                        </button>
                      </div>
                    </div>
                    <img
                      className={`${
                        item.isMainImage ? "main__image" : ""
                      } rounded-md`}
                      style={{ objectFit: "contain" }}
                      src={item.bannerImage}
                    />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
            <div className="main__image__slider__adding__container flex items-center justify-end mt-4">
              <div
                onClick={() => {
                  setEdit({ mode: false, id: null });
                  setIsPopupOpen(true);
                }}
                className="py-3 px-5 bg-zinc-800 text-white rounded-md font-Karla cursor-pointer hover:bg-zinc-600 transition flex items-center gap-2 text-sm"
              >
                <div className="text-xl flex items-center justify-center">
                  {" "}
                  <ion-icon name="add"></ion-icon>{" "}
                </div>
                <span> Add New Banner </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageSliderAdmin;
