import React from "react";

const ProductsNavbar = ({ setIsProductPopupOpen, isProductPopupOpen }) => {
  return (
    <>
      <section id="products__navbar">
        <div className="container mx-auto px-4 sm:px-0">
          <div className="products__navbar__container">
            <button
              type="button"
              className="py-3 px-6 sm:w-auto w-full bg-zinc-900 text-white rounded-md text-sm font-Karla flex items-center gap-2"
              onClick={() => {
                setIsProductPopupOpen(true);
              }}
            >
              <div className="flex-center">
                <ion-icon name="cube-outline"></ion-icon>
              </div>
              Add New Product
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsNavbar;
