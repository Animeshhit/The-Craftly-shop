import React, { useEffect, useState } from "react";
import {
  BannerAddPopup,
  ImageSliderAdmin,
  ProductsAdmin,
  ProductsNavbar,
} from "../../components";

const MyShop = ({ setLoadingProgress }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [banners, setBanners] = useState(null);
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  return (
    <div>
      <BannerAddPopup
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        setLoadingProgress={setLoadingProgress}
        banners={banners}
        setBanners={setBanners}
      />
      <ImageSliderAdmin
        isPopupOpen={isPopupOpen}
        setLoadingProgress={setLoadingProgress}
        setIsPopupOpen={setIsPopupOpen}
        banners={banners}
        setBanners={setBanners}
      />
      <ProductsNavbar />
      <ProductsAdmin />
    </div>
  );
};

export default MyShop;
