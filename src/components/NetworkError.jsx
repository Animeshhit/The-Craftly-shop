import React from "react";

const NetworkError = () => {
  return (
    <div className="w-screen h-screen bg-red-500 flex items-center justify-center">
      <h1 className="text-white font-Karla text-2xl flex items-center justify-center gap-3">
        <ion-icon name="wifi-outline"></ion-icon>
        Network Connection Error
      </h1>
    </div>
  );
};

export default NetworkError;
