import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar, Footer, AdminNavbar, Loading } from "./components";
import { useEffect, useState } from "react";
import MyShop from "./pages/adminPages/MyShop";
import Orders from "./pages/adminPages/Orders";
import Users from "./pages/adminPages/Users";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
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
          element={
            <Home setLoadingProgress={setLoadingProgress} loading={loading} />
          }
        />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <MyShop
                setLoadingProgress={setLoadingProgress}
                loading={loading}
              />
            ) : (
              <Home setLoadingProgress={setLoadingProgress} loading={loading} />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            isAdmin ? (
              <Orders
                setLoadingProgress={setLoadingProgress}
                loading={loading}
              />
            ) : (
              <Home setLoadingProgress={setLoadingProgress} loading={loading} />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            isAdmin ? (
              <Users
                setLoadingProgress={setLoadingProgress}
                loading={loading}
              />
            ) : (
              <Home setLoadingProgress={setLoadingProgress} loading={loading} />
            )
          }
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
