import React, { useEffect, useState } from "react";
import {
  BannerAddPopup,
  ImageSliderAdmin,
  ProductsAdmin,
  ProductsNavbar,
} from "../../components";
import { baseApiURLForAdmin } from "../../../config/api";

const MyShop = ({ setLoadingProgress }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [banners, setBanners] = useState(null);
  const [edit, setEdit] = useState({
    mode: false,
    id: null,
  });

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [editBtnDisabled, setEditBtnDisabled] = useState(false);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(false);

  const initialData = {
    bannerImage: "",
    bannerLink: "",
  };
  const [data, setData] = useState(initialData);

  const editABannerImage = async (bannerId) => {
    try {
      let token = localStorage.getItem("__token");
      if (!token) return;

      setLoadingProgress(30);
      let APIREQ = await fetch(
        `${baseApiURLForAdmin}/editabannerimage?adminapikey=${token}&bannerId=${bannerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let APIRES = await APIREQ.json();
      setLoadingProgress(50);
      console.log(APIRES);
      if (APIREQ.status == 200) {
        setData(initialData);
        setIsPopupOpen(false);
        setBanners((prevBanners) =>
          prevBanners.map((banner) =>
            banner._id === APIRES.banner._id
              ? { ...banner, ...APIRES.banner }
              : banner
          )
        );
        setEdit({ mode: false, id: null });
      } else {
        alert(APIRES.message);
      }
      setLoadingProgress(70);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setLoadingProgress(100);
    }
  };

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
        data={data}
        setData={setData}
        edit={edit}
        setEdit={setEdit}
        editABannerImage={editABannerImage}
        submitBtnDisabled={submitBtnDisabled}
        setSubmitBtnDisabled={setSubmitBtnDisabled}
      />
      <ImageSliderAdmin
        isPopupOpen={isPopupOpen}
        setLoadingProgress={setLoadingProgress}
        setIsPopupOpen={setIsPopupOpen}
        banners={banners}
        setBanners={setBanners}
        data={data}
        setData={setData}
        edit={edit}
        setEdit={setEdit}
        editBtnDisabled={editBtnDisabled}
        setEditBtnDisabled={setEditBtnDisabled}
        deleteBtnDisabled={deleteBtnDisabled}
        setDeleteBtnDisabled={setDeleteBtnDisabled}
      />
      <ProductsNavbar />
      <ProductsAdmin />
    </div>
  );
};

export default MyShop;
