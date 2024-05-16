import React, { useEffect, useState } from "react";
import {
  BannerAddPopup,
  ImageSliderAdmin,
  ProductsAdmin,
  ProductsNavbar,
} from "../../components";

const MyShop = ({ setLoadingProgress }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  return (
    <div>
      <BannerAddPopup
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        setLoadingProgress={setLoadingProgress}
      />
      <ImageSliderAdmin
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
      <ProductsNavbar />
      <ProductsAdmin />
    </div>
  );
};

export default MyShop;
