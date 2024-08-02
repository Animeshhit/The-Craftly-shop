import { NavLink } from "react-router-dom";

const SearchProductCard = ({ product }) => {
  return (
    <>
      <NavLink
        to={`/product/From Search Results/${product._id}`}
        className="search__product__card__container flex gap-3 items-center hover:bg-zinc-200 rounded-md py-2 px-1"
      >
        <img
          className="object-cover object-center rounded-md loading"
          src={product.productImage}
          width="50px"
          height="50px"
          onLoad={(e) => {
            e.target.classList.remove("loading");
          }}
          alt={product.name}
        />
        <div>
          <small
            style={{ lineHeight: 0 }}
            className="uppercase text-xs leading-3 text-gray-500"
          >
            {product.catagories}
          </small>
          <p className="font-semibold">{product.name}</p>
        </div>
      </NavLink>
    </>
  );
};

export default SearchProductCard;
