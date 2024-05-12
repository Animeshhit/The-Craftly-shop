import { NavLink } from "react-router-dom";

const ProductAdmin = ({ Price, OPrice, discount, ProductImage }) => {
  return (
    <NavLink
      to="/product/edit"
      className="product__admin__card w-[300px] h-auto shadow-lg"
    >
      <div className="card__image__container w-full h-[250px]  bg-zinc-800 flex items-center justify-center">
        <span className="text-white font-Karla text-2xl">300 X 250</span>
      </div>
      <div className="card__body py-3 px-4">
        <p className="capitalize font-Karla text-xl font-semibold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
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
