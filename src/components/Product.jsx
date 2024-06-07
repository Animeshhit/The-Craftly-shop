import React from "react";
import { NavLink } from "react-router-dom";

const Product = ({ image, title, price, discount, original__price }) => {
  return (
    <NavLink
      to={"/"}
      className="product__card w-full h-auto bg-gray-100 rounded-br-lg rounded-bl-lg"
    >
      <div className="product__card__image w-full relative">
        <div className="absolute py-2 px-6 bg-zinc-900 text-white rounded-tl-lg rounded-br-lg font-Karla text-sm font-semibold">
          New
        </div>
        <img
          src={image}
          alt={title}
          className="h-[300px] w-full object-cover object-center rounded-tr-lg rounded-tl-lg"
        />
      </div>
      <div className="product__card__body px-4 py-3">
        <h1 className="font-Karla font-bold">{title}</h1>
        <div className="product__card__price__tag mt-3 flex items-center gap-3">
          <strong className="flex items-center">
            <img src="/rs.svg" className="w-4 h-4" alt="rs" />
            {price}
          </strong>
          <p className="line-through text-sm font-Karla font-semibold text-gray-600">
            1299
          </p>
          <p className="font-semibold text-blue-600">{discount}%</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
