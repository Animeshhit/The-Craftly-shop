import React from "react";

const SklLoading = ({ styles, innerStyles }) => {
  return (
    <div className={styles}>
      <div className={`bg-zinc-800 animate-pulse h-full ${innerStyles}`}></div>
    </div>
  );
};

export default SklLoading;
