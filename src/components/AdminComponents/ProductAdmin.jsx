import { NavLink } from "react-router-dom";

const ProductAdmin = ({ Price, OPrice, discount, ProductImage, src, Name }) => {
  return (
    <NavLink
      to={src}
      className="product__admin__card w-[300px] h-auto shadow-lg"
    >
      <div className="card__image__container w-full h-[250px] flex items-center justify-center">
        <img
          src={ProductImage}
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <div className="card__body py-3 px-4">
        <p className="capitalize font-Karla text-xl font-semibold">{Name}</p>
        <div className="product__info flex items-center my-3 gap-3">
          <p>
            <strong>Price :</strong>
            <span> {Price}</span>
          </p>
          <p>
            <strong>OPrice :</strong>
            <span> {OPrice} </span>
          </p>
          <p>
            <strong>Discount :</strong>
            <span> {discount} </span>
          </p>
        </div>
        <div className="product__stock">
          <p>
            <strong>Stock : </strong>
            <span>{discount}%</span>
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductAdmin;
