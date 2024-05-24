import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AdminNavbar } from "../../components";

const AdminMiddleware = ({
  component: Component,
  loadingComponent,
  redirect,
  ...rest
}) => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <AdminNavbar />
      {auth.isAuth == null ? (
        <loadingComponent />
      ) : auth.isAuth ? (
        auth.user.isAdmin ? (
          <Component {...rest} />
        ) : (
          <Navigate to={redirect} replace={true} />
        )
      ) : (
        <Navigate to="/auth/register" replace={true} />
      )}
    </>
  );
};

export default AdminMiddleware;
