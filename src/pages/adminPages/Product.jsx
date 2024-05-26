import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GET } from "../../../config/getFunction";
import { baseApiURL } from "../../../config/api";

const Product = ({ setLoadingProgress }) => {
  const { id } = useParams();
  const location = useLocation();
  const [pathname, setPathName] = useState(location.pathname);
  const [currentProduct, setCurrentProduct] = useState(null);
  useEffect(() => {
    setPathName(location.pathname);
    console.lo;
  }, [location.pathname]);

  const getProduct = async () => {
    try {
      if (!id) {
        return;
      }
      console.log(id);
      GET(`${baseApiURL}/product?id=${id}`)
        .then((data) => {
          if (data.status == 200) {
            console.log(data);
            setCurrentProduct(data.product[0]);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
                className={`product__image__main relative w-full h-[350px] flex items-center justify-center rounded-md`}
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
                {currentProduct && (
                  <img
                    src={currentProduct.productImage}
                    alt="image"
                    className="w-full h-full object-cover object-center hover:object-contain transition"
                  />
                )}
              </div>
              {/* main image  */}
              <div className="product__images__others flex items-center gap-3 my-4 overflow-auto">
                <div className="others w-[60px] h-[60px] bg-violet-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-blue-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-yellow-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-red-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-green-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-violet-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-blue-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-yellow-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-red-600 rounded-md flex-shrink-0"></div>
                <div className="others w-[60px] h-[60px] bg-green-600 rounded-md flex-shrink-0"></div>
              </div>
            </div>
            {/* right side  */}
            <div className="product__details w-1/2">
              <div className="product__title">
                <h1 className="font-Karla font-semibold leading-7 text-2xl">
                  {" "}
                  {currentProduct && currentProduct.productName}
                </h1>
              </div>
              <div className="product__description mt-4 font-Karla text-sm">
                {currentProduct && currentProduct.productDescription}
              </div>
              <div className="product__rating my-3 flex items-center gap-2">
                <div className="rating bg-blue-600 w-max py-1 px-2 text-xs rounded-md text-white font-Karla">
                  4.2
                </div>
                <p className="font-Karla text-sm">386 rating & 200 reviews</p>
              </div>
              <div className="product__price my-4 flex items-center gap-2">
                <h1 className="font-Karla font-semibold text-3xl">
                  {currentProduct && currentProduct.price}
                </h1>
                <p className="text-gray-400 font-Karla line-through">3999</p>
                <p className="font-Karla text-blue-500 font-semibold text-xl">
                  {currentProduct && currentProduct.discount}% off
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
