import React, { useEffect, useState } from "react";
import ProductAdmin from "./ProductAdmin";
import { baseApiURL } from "../../../config/api";
import { GET } from "../../../config/getFunction";

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
      <section id="products__admin" className="my-6">
        <div className="container mx-auto sm:px-0 px-4">
          <div
            className="product__admin__container flex items-center gap-6 flex-wrap justify-center
          "
          >
            {products == null ? (
              "loading"
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
              <p>No products Found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsAdmin;
