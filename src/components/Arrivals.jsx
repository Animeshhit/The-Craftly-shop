import React, { useState, useEffect } from "react";
import Product from "./Product";
import { baseApiURL } from "../../config/api";
import { GET } from "../../config/getFunction";

const Arrivals = () => {
  const [products, setProducts] = useState(null);
  const errorState = [["Something went wrong!!"]];

  // states of data buffering
  // null ====> Loading
  // [] ====> No product
  // [{...}] ==> Data found and ready to shoow
  // [[]] =====> server error or network error

  const getProducts = async () => {
    try {
      GET(`${baseApiURL}/products`)
        .then((res) => {
          console.log(res);
          if (res.status !== 200) {
            setProducts(errorState);
            alert(res.message);
            return;
          }
          setProducts(res.products);
        })
        .catch((err) => {
          console.log(err);
          setProducts(errorState);
          alert(err.message);
        });
    } catch (err) {
      console.log(err);
      setProducts(errorState);
      alert("something went wrong");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section id="newArrivals__section" className="my-12">
      <div className="container mx-auto md:px-0 px-4">
        <h1 className="font-bold font-Karla my-12 text-3xl relative">
          New{" "}
          <strong className="text-md cssTextUnderLIneSystem font-Karla text-blue-800">
            Arrivals
          </strong>
        </h1>

        <div className="newArrivals__cards grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {products == null
            ? "loading...."
            : products.length > 0
            ? products[0][0]
              ? products[0][0]
              : products.map((item, key) => {
                  return (
                    <Product
                      key={key}
                      image={item.productImage}
                      title={item.productName}
                      price={item.price}
                      original__price="500"
                      discount={item.discount}
                    />
                  );
                })
            : "no proudct found"}
        </div>
      </div>
    </section>
  );
};

export default Arrivals;
