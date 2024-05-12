import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const ImageSliderAdmin = () => {
  const [MainImageDropDown, setMainImageDropDown] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
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
  return (
    <>
      <section id="image__slider__editor" className="my-12">
        <div className="container mx-auto sm:px-0 px-4">
          <h1 className="font-bold text-2xl md:text-3xl font-Karla">
            Main Image Slider Editor
          </h1>
          <div className="slider__container mt-6 py-4 rounded-lg">
            <div className="slider__container__header__components flex items-center justify-start md:justify-end">
              <div className="main__dropdown__container relative">
                <button
                  onClick={() => {
                    setMainImageDropDown((state) => !state);
                  }}
                  className="text-white bg-zinc-900 hover:bg-zinc-600 font-medium rounded-lg  px-5 py-2.5 text-center inline-flex items-center"
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
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Swiper
              className="mt-4"
              pagination={{ dynamicBullets: true }}
              loop={true}
              slidesPerView={slidesPerView}
              spaceBetween={30}
              modules={[Pagination]}
            >
              <SwiperSlide className="image__slider__editor main__image">
                <div className="image__slider__editor__container text-center flex items-center justify-center flex-col">
                  <p className="font-Karla font-semibold text-white text-xl py-3">
                    Main Image
                  </p>
                  <div className="flex items-center gap-4 justify-center">
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="create"></ion-icon>
                    </button>
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="trash"></ion-icon>
                    </button>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </SwiperSlide>
              <SwiperSlide className="image__slider__editor">
                <div className="image__slider__editor__container text-center flex items-center justify-center flex-col">
                  <p className="font-Karla font-semibold text-white text-xl py-3">
                    Second Image
                  </p>
                  <div className="flex items-center gap-4 justify-center">
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="create"></ion-icon>
                    </button>
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="trash"></ion-icon>
                    </button>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </SwiperSlide>
              <SwiperSlide className="image__slider__editor">
                <div className="image__slider__editor__container text-center flex items-center justify-center flex-col">
                  <p className="font-Karla font-semibold text-white text-xl py-3">
                    Third Image
                  </p>
                  <div className="flex items-center gap-4 justify-center">
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="create"></ion-icon>
                    </button>
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="trash"></ion-icon>
                    </button>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </SwiperSlide>
              <SwiperSlide className="image__slider__editor">
                <div className="image__slider__editor__container text-center flex items-center justify-center flex-col">
                  <p className="font-Karla font-semibold text-white text-xl py-3">
                    Fourth Image
                  </p>
                  <div className="flex items-center gap-4 justify-center">
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="create"></ion-icon>
                    </button>
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="trash"></ion-icon>
                    </button>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </SwiperSlide>
              <SwiperSlide className="image__slider__editor">
                <div className="image__slider__editor__container text-center flex items-center justify-center flex-col">
                  <p className="font-Karla font-semibold text-white text-xl py-3">
                    Fifth Image
                  </p>
                  <div className="flex items-center gap-4 justify-center">
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="create"></ion-icon>
                    </button>
                    <button
                      type="button"
                      className="bg-white text-xl w-[30px] h-[30px] flex items-center justify-center font-semibold text-zinc-800 rounded-full cursor-pointer"
                    >
                      <ion-icon name="trash"></ion-icon>
                    </button>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </SwiperSlide>
            </Swiper>
            <div className="main__image__slider__adding__container flex items-center justify-end mt-4">
              <div className="py-3 px-12 bg-zinc-800 text-white rounded-md font-semibold font-Karla cursor-pointer hover:bg-zinc-600 transition flex items-center gap-2">
                <div className="text-xl flex items-center justify-center">
                  {" "}
                  <ion-icon name="add"></ion-icon>{" "}
                </div>
                <span> Add New Product </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageSliderAdmin;
