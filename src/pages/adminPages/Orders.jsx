import React, { useEffect } from "react";

const Orders = ({ setLoadingProgress }) => {
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  return <div></div>;
};

export default Orders;
