import React from "react";
import Product from "./Product";

const Arrivals = () => {
  return (
    <section id="newArrivals__section" className="my-12">
      <div className="container mx-auto md:px-0 px-4">
        <h1 className="font-extrabold font-Karla my-12 text-3xl">
          New Arrivals
        </h1>

        <div className="newArrivals__cards flex flex-wrap justify-start gap-12">
          <Product
            image={
              "https://plus.unsplash.com/premium_photo-1665218521340-cf742f7f639f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            title="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="399"
            original__price="500"
            discount="70"
          />
          <Product
            image={
              "https://plus.unsplash.com/premium_photo-1665218521340-cf742f7f639f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            title="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="399"
            original__price="500"
            discount="70"
          />
          <Product
            image={
              "https://plus.unsplash.com/premium_photo-1665218521340-cf742f7f639f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            title="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="399"
            original__price="500"
            discount="70"
          />
          <Product
            image={
              "https://plus.unsplash.com/premium_photo-1665218521340-cf742f7f639f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            title="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="399"
            original__price="500"
            discount="70"
          />
          <Product
            image={
              "https://plus.unsplash.com/premium_photo-1665218521340-cf742f7f639f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            title="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="399"
            original__price="500"
            discount="70"
          />
        </div>
      </div>
    </section>
  );
};

export default Arrivals;
