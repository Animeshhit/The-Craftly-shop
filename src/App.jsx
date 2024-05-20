import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar, Footer, AdminNavbar, Loading } from "./components";
import { useEffect, useState } from "react";
import MyShop from "./pages/adminPages/MyShop";
import Orders from "./pages/adminPages/Orders";
import Users from "./pages/adminPages/Users";
import LoadingBar from "react-top-loading-bar";
import Regiser from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Error from "./pages/Error";
import Account from "./pages/Account";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      {pathName == "/admin" ? (
        <AdminNavbar loading={loading} />
      ) : (
        <Navbar loading={loading} />
      )}
      {loading && <Loading loading={loading} />}

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home setLoadingProgress={setLoadingProgress} loading={loading} />
          }
        />
        <Route
          path="/auth/register"
          exact
          element={<Regiser setLoadingProgress={setLoadingProgress} />}
        />
        <Route
          path="/auth/login"
          exact
          element={<Login setLoadingProgress={setLoadingProgress} />}
        />
        <Route
          path="/user/account"
          exact
          element={<Account setLoadingProgress={setLoadingProgress} />}
        />
        <Route
          path="/admin"
          exact
          element={
            isAdmin ? (
              <MyShop
                setLoadingProgress={setLoadingProgress}
                loading={loading}
              />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/admin/orders"
          exact
          element={
            isAdmin ? (
              <Orders
                setLoadingProgress={setLoadingProgress}
                loading={loading}
              />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/admin/users"
          exact
          element={
            isAdmin ? (
              <Users
                setLoadingProgress={setLoadingProgress}
                loading={loading}
              />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
