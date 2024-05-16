import React, { useEffect } from "react";

const Users = ({ setLoadingProgress }) => {
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  return <div></div>;
};

export default Users;
