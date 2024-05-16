import React from "react";

const ProductsNavbar = () => {
  return (
    <>
      <section id="products__navbar">
        <div className="container mx-auto sm:px-4 px-0">
          <div className="products__navbar__container px-4">
            <button
              type="button"
              className="py-3 px-6 sm:w-auto w-full bg-zinc-900 text-white rounded-md"
            >
              Add New Product
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsNavbar;
