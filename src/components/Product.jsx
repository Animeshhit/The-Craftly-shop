import React from "react";
import { NavLink } from "react-router-dom";

const Product = ({ image, title, price, discount, original__price }) => {
  return (
    <NavLink to={"/"} className="product__card w-auto h-[350px]">
      <div className="product__card__image__container w-full h-full">
        <img
          src={image}
          className="product__image w-full h-full object-cover object-center"
          alt="product__image"
        />
      </div>
      <div className="product__card__body">
        <p>{title}</p>
        <div className="product__card__pricing">
          <span>{original__price}</span>
          <span>{price}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
