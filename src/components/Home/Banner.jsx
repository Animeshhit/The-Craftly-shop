import React from "react";

const Banner = () => {
  return (
    <div className="flex items-center justify-center gap-6 px-1 md:px-3 py-6 bg-blue-500 rounded-md mt-6">
      <img
        className="md:w-1/6  w-2/6"
        src="/ProductBanner.svg"
        loading="lazy"
        alt=""
      />
      <div className="">
        <h3 className="font-Karla font-semibold sm:text-2xl text-white">
          Unique Gifts Online
        </h3>
        <p className="font-Karla mt-1 text-xs md:text-sm text-gray-200">
          Curated to make every special moment a celebration
        </p>
      </div>
    </div>
  );
};

export default Banner;
