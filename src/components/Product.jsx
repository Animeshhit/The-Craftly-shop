//core modules
import truncateText from "@/Helper/TextSpliter";
import { useState } from "react";
import { NavLink } from "react-router-dom";

//other modules
const Product = ({ Text, product }) => {
  const [isLoaded, setIsLoaded] = useState(false);
 
  return (
    <NavLink
      to={`/product/${Text}/${product._id}`}
      className="rounded-lg inline-block w-full"
    >
      <div
        className={`relative h-[300px] max-w-[300px] bg-zinc-300 rounded-lg ${
          !isLoaded && "animate-pulse"
        }`}
      >
        {/* <div className="flex-center absolute right-0 top-0 rounded-tr-lg z-20 w-50 h-50 p-3 bg-[rgba(0,0,0,0.8)] text-xl text-white">
          <ion-icon name="heart-outline"></ion-icon>
        </div> */}
        <img
          src={product.productImage}
          className="w-full object-cover object-center h-full rounded-lg transition-all bg-zinc-300 blur opacity-0"
          loading="lazy"
          onLoad={(e) => {
            e.target.classList.remove("blur");
            e.target.classList.remove("opacity-0");
            setIsLoaded(true);
          }}
          alt={product.name}
        />
      </div>
      <div className="product__info mt-1 pt-2 pb-3">
        <h3 className="uppercase text-xs font-semibold text-gray-400">
          {product.catagories}
        </h3>
        <h4 className="font-semibold text-balance !leading-2">
          {truncateText(product.name, 33)}
        </h4>
        <p className="font-bold text-sm flex items-center mt-0.5 text-rose-500">
          <img src="/Price.svg" alt="rs" className="w-3 h-3" />
          {product.discount}
        </p>
        {/* <div className="product__price flex items-center mt-3">
          <strong className="flex items-center">
            <img className="w-5 h-5" src="/Price.svg" alt="rs" />
            <span className="sm:text-xl text-zinc-800">{product.discount}</span>
          </strong>
          <span className="flex px-3 sm:pr-5 sm:pl-2 items-center">
            <img className="w-4 h-4" src="./PriceGray.svg" alt="rs" />
            <span className="text-sm text-gray-500 line-through">
              {product.price}
            </span>
          </span>
          <div className="border-2 border-blue-500 py-2 px-4">
            <span className="font-Karla text-xs sm:text-sm font-semibold text-blue-600">
              {calculateDiscountPercentage(product.price, product.discount)}%
              OFF
            </span>
          </div>
        </div> */}
      </div>
    </NavLink>
  );
};

export default Product;
