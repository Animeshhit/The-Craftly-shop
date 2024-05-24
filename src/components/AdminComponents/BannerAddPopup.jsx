import { useState } from "react";
import { baseApiURLForAdmin } from "../../../config/api";

const BannerAddPopup = ({
  isPopupOpen,
  setIsPopupOpen,
  setLoadingProgress,
  banners,
  setBanners,
  data,
  setData,
  edit,
  setEdit,
  editABannerImage,
  submitBtnDisabled,
  setSubmitBtnDisabled,
}) => {
  const initialData = {
    bannerImage: "",
    bannerLink: "",
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // for creating a new banner
  const createNewBanner = async () => {
    try {
      let token = localStorage.getItem("__token");
      if (!token) return;
      setLoadingProgress(30);
      let APIREQ = await fetch(
        `${baseApiURLForAdmin}/addnewbanner?adminapikey=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let APIRES = await APIREQ.json();
      setLoadingProgress(50);
      console.log(APIRES);
      if (APIREQ.status == 201) {
        alert(APIRES.message);
        setIsPopupOpen(false);
        banners.push(APIRES.banner);
        setBanners(banners);
        setData(initialData);
      } else {
        alert(APIRES.message);
      }
      setLoadingProgress(70);
    } catch (err) {
      alert(err.message);
      console.log(err);
    } finally {
      setLoadingProgress(100);
    }
  };
  return (
    <>
      <div
        tabindex="-1"
        aria-hidden="true"
        className={`${
          isPopupOpen ? "flex" : "hidden"
        } bg-[rgba(0,0,0,0.3)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg">
            <div className="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Banner and a Link
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  setData(initialData);
                  setIsPopupOpen(false);
                  setEdit({ mode: false, id: null });
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  setSubmitBtnDisabled(true);
                  e.preventDefault();
                  edit.mode && edit.id
                    ? editABannerImage(edit.id)
                    : createNewBanner();

                  setTimeout(() => {
                    setSubmitBtnDisabled(false);
                  }, 200);
                }}
              >
                <div>
                  <label
                    htmlFor="bannerImage"
                    className="block mb-2 font-medium text-gray-900"
                  >
                    Banner Image
                  </label>
                  <input
                    type="text"
                    name="bannerImage"
                    id="bannerImage"
                    value={data.bannerImage}
                    onChange={handleChange}
                    className="py-3 px-4 w-full outline-none bg-gray-300 rounded-md"
                    placeholder="https://plus.unsplash.com/premium_photo-1715588659685-fac565ef60bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlhtmlFor="bannerLink"
                    className="block mb-2 font-medium text-gray-900"
                  >
                    Banner Link
                  </label>
                  <input
                    type="string"
                    name="bannerLink"
                    id="bannerLink"
                    value={data.bannerLink}
                    onChange={handleChange}
                    placeholder="/products"
                    className="py-3 px-4 outline-none w-full rounded-md bg-gray-300"
                    required
                  />
                </div>
                <button
                  disabled={submitBtnDisabled}
                  type="submit"
                  className="w-full text-white bg-zinc-900 py-3 px-4 rounded-md"
                >
                  {edit.mode ? "Update Banner" : "Create Banner"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerAddPopup;
