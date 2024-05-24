import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Navbar } from "../../components";

const AuthMiddleware = ({
  component: Component,
  redirect,
  authRequired,
  ...rest
}) => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      {auth.isAuth === null ? (
        "loading"
      ) : auth.isAuth ? (
        authRequired ? (
          <Component {...rest} />
        ) : (
          <Navigate to={redirect} replace={true} />
        )
      ) : authRequired ? (
        <Navigate to={redirect} replace={true} />
      ) : (
        <Component {...rest} />
      )}
    </>
  );
};

export default AuthMiddleware;
