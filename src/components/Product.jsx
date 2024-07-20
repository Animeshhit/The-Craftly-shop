//core modules
import { NavLink } from "react-router-dom";

//other modules
const Product = ({ Text, product }) => {
  function calculateDiscountPercentage(originalPrice, discountedPrice) {
    if (originalPrice <= 0) {
      throw new Error("Original price must be greater than zero.");
    }
    const discount = originalPrice - discountedPrice;
    const discountPercentage = (discount / originalPrice) * 100;
    return Math.floor(discountPercentage);
  }
  return (
    <NavLink
      to={`/product/${Text}/${product._id}`}
      className="border-2 rounded-lg inline-block w-full"
    >
      <div className="product__image__container relative h-[300px] bg-zinc-800">
        <div className="flex-center absolute right-0 top-0 rounded-tr-lg z-20 w-50 h-50 p-3 bg-[rgba(0,0,0,0.8)] text-xl text-white">
          <ion-icon name="heart-outline"></ion-icon>
        </div>
        <img
          src={product.productImage}
          className="w-full h-full rounded-t-lg bg-zinc-800 blur"
          loading="lazy"
          onLoad={(e) => {
            e.target.classList.remove("blur");
          }}
          alt={product.name}
        />
      </div>
      <div className="product__info mt-1 px-4 pt-1 pb-3">
        <p className="font-Karla font-semibold text-xl">{product.name}</p>
        <div className="product__price flex items-center mt-3">
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
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
