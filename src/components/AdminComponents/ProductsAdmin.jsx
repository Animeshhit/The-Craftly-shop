import React, { useEffect, useState } from "react";
import ProductAdmin from "./ProductAdmin";
import { baseApiURL } from "../../../config/api";
import { GET } from "../../../config/getFunction";
import SklLoading from "../CustomComponents/SklLoading";

const ProductsAdmin = ({ products, setProducts }) => {
  const getAllProducts = async () => {
    try {
      GET(`${baseApiURL}/products`)
        .then((data) => {
          if (data.status == 200) {
            setProducts(data.products);
            console.log(data.products);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <section id="products__admin" className="my-8">
        <div className="container mx-auto px-4 sm:px-0">
          <div
            className="product__admin__container flex items-center gap-6 flex-wrap justify-center
          "
          >
            {products == null ? (
              <div className="flex items-center w-full gap-5 flex-wrap justify-center">
                {Array.from({ length: 6 }).map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="product__loading w-[300px] shadow-xl py-3 px-4 bg-blue-300 rounded-md"
                    >
                      <SklLoading
                        styles="w-full h-[250px]"
                        innerStyles="rounded-md"
                      />
                      <SklLoading
                        styles="w-full h-[30px]"
                        innerStyles="rounded-md mt-5"
                      />
                      <SklLoading
                        styles="w-full h-[30px]"
                        innerStyles="rounded-md mt-2"
                      />
                      <SklLoading
                        styles="w-2/3 h-[30px]"
                        innerStyles="rounded-md mt-2"
                      />
                    </div>
                  );
                })}
              </div>
            ) : products.length > 0 ? (
              products.map((item, key) => (
                <ProductAdmin
                  key={key}
                  src={`/admin/product/${item._id}`}
                  Price={item.price}
                  OPrice="500"
                  discount={item.discount}
                  ProductImage={item.productImage}
                  Name={item.productName}
                />
              ))
            ) : (
              <div className="product__loading w-full py-3 rounded-md">
                <div className="w-1/3 h-[250px] bg-zinc-900 flex-center rounded-md">
                  <p className="text-white font-Karla">No Products Found</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsAdmin;
