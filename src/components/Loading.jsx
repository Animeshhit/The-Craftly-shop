import React from "react";

const Loading = () => {
  return (
    <div
      style={{ zIndex: 1000 }}
      className="fixed w-full h-full top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)]"
    ></div>
  );
};

export default Loading;
