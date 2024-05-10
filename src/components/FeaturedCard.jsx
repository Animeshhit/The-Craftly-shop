import { NavLink } from "react-router-dom";
import "./FeaturedCard.css";

const FeaturedCard = ({ image, title }) => {
  return (
    <>
      <NavLink
        to="/"
        className="fCard block sm:w-auto w-full h-[200px] rounded-md relative"
      >
        <div className="card__image w-full h-full">
          <img
            className="w-full h-full object-cover object-center rounded-md"
            src={
              image ||
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="product__title"
          />
        </div>
        <div className="absolute card__overlay rounded-md flex items-end py-3 px-4 capitalize">
          <p className="text-white text-lg">{title}</p>
        </div>
      </NavLink>
    </>
  );
};

export default FeaturedCard;
