import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Product = () => {
  const [mainImage, setMainImage] = useState({
    isMain: true,
    item: "bg-blue-500",
  });
  const location = useLocation();
  const [pathname, setPathName] = useState(location.pathname);
  useEffect(() => {
    setPathName(location.pathname);
    console.lo;
  }, [location.pathname]);
  return (
    <>
      <section className="admin__product my-8">
        <div className="container mx-auto px-4 sm:px-0">
          <div className="page__header mb-6 flex items-center bg-blue-300 shadow-md w-max py-3 px-4 rounded-md">
            <div className="flex-center text-sm">
              <ion-icon name="home-outline"></ion-icon>
            </div>
            <p className="font-Karla capitalize text-sm">{pathname}</p>
            <div className="flex-center text-sm">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="product__images w-1/2">
              {/* main image  */}
              <div
                className={`product__image__main relative w-full h-[350px] flex items-center justify-center rounded-md ${
                  mainImage && mainImage.item
                }`}
              >
                <div className="absolute right-2 cursor-pointer top-2 text-white py-3 px-4 rounded-md bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
                  <ion-icon name="create-outline"></ion-icon>
                </div>
                <div className="absolute right-[9%] cursor-pointer top-2 text-white py-3 px-4 rounded-md bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
                  <ion-icon name="trash-outline"></ion-icon>
                </div>
                <div className="absolute right-[17%] cursor-pointer top-2 text-white py-3 px-4 rounded-md bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
                  <ion-icon name="add-circle-outline"></ion-icon>
                </div>
                <h1 className="font-Karla text-white text-3xl">
                  {mainImage && mainImage.isMain ? "Main Image" : ""}
                </h1>
              </div>
              {/* main image  */}
              <div className="product__images__others flex items-center gap-3 my-4 overflow-auto">
                <div
                  onClick={() => {
                    setMainImage({ isMain: true, item: "bg-violet-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-violet-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-blue-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-blue-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-yellow-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-yellow-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-red-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-red-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-green-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-green-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-violet-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-violet-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-blue-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-blue-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-yellow-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-yellow-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-red-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-red-600 rounded-md flex-shrink-0"
                ></div>
                <div
                  onClick={() => {
                    setMainImage({ isMain: false, item: "bg-green-600" });
                  }}
                  className="others w-[60px] h-[60px] bg-green-600 rounded-md flex-shrink-0"
                ></div>
              </div>
            </div>
            {/* right side  */}
            <div className="product__details w-1/2">
              <div className="product__title">
                <h1 className="font-Karla font-semibold leading-7 text-2xl">
                  {" "}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Expedita reprehenderit blanditiis quia?
                </h1>
              </div>
              <div className="product__description mt-4 font-Karla text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Expedita reprehenderit blanditiis quia? Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Expedita reprehenderit
                blanditiis quia?
              </div>
              <div className="product__rating my-3 flex items-center gap-2">
                <div className="rating bg-blue-600 w-max py-1 px-2 text-xs rounded-md text-white font-Karla">
                  4.2
                </div>
                <p className="font-Karla text-sm">386 rating & 200 reviews</p>
              </div>
              <div className="product__price my-4 flex items-center gap-2">
                <h1 className="font-Karla font-semibold text-3xl">1299</h1>
                <p className="text-gray-400 font-Karla line-through">3999</p>
                <p className="font-Karla text-blue-500 font-semibold text-xl">
                  78% off
                </p>
              </div>
              <div className="product__edit__btn flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center py-3 px-4 text-sm font-Karla gap-2 bg-blue-600 cursor-pointer hover:bg-blue-400 transition text-white rounded-md shadow-lg hover:shadow-none"
                >
                  <ion-icon name="create-outline"></ion-icon>
                  Edit Product Details
                </button>
                <button
                  type="button"
                  className="flex items-center py-3 px-4 text-sm font-Karla gap-2 bg-zinc-900 transition hover:bg-zinc-500  text-white rounded-md shadow-lg hover:shadow-none"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
