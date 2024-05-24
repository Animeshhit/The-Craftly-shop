import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import {
  Navbar,
  Footer,
  AdminNavbar,
  Loading,
  NetworkError,
} from "./components";
import { useEffect, useState } from "react";
import MyShop from "./pages/adminPages/MyShop";
import Orders from "./pages/adminPages/Orders";
import Users from "./pages/adminPages/Users";
import LoadingBar from "react-top-loading-bar";
import Regiser from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Error from "./pages/Error";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";
import { baseApiURL } from "../config/api";
import { GET } from "../config/getFunction";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/Slices/authSlice";
import { setInitialItems } from "./store/Slices/cartSlice";

const App = () => {
  //redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [NetworkConnection, setNetWorkConnection] = useState(false);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    setLoadingProgress(100);
  }, []);

  const LoggedInUser = async () => {
    // check token is valid or not if valid go ahead if not valid then return but give no feedback
    // if request error then say only network connection error
    // if apireq == 200 then only do something otherwise don't give response
    // server is giving response but don't show that.
    try {
      let token = localStorage.getItem("__token");
      if (!token) {
        dispatch(getUser({ isAuth: false, user: null }));
        return;
      }
      GET(`${baseApiURL}/auth/login?apikey=${token}`)
        .then((data) => {
          if (data.status == 200) {
            setIsAdmin(data.user.isAdmin);
            dispatch(getUser({ isAuth: true, user: data.user }));
            dispatch(setInitialItems(data.user.cart));
          } else {
            dispatch(getUser({ isAuth: false, user: null }));
          }
        })
        .catch((err) => {
          dispatch(getUser({ isAuth: false, user: null }));
          console.log(err);
        });
    } catch (err) {
      dispatch(getUser({ isAuth: false, user: null }));
      console.log(err);
      alert("Network Connection Error");
      setNetWorkConnection(true);
    }
  };

  useEffect(() => {
    LoggedInUser();
  }, []);

  if (NetworkConnection) {
    return <NetworkError />;
  }

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      {auth.isAuth == null ? (
        <div className="w-full h-[60px] bg-zinc-700 animate-pulse"></div>
      ) : auth.isAuth ? (
        isAdmin ? (
          pathName == "/admin" ? (
            <AdminNavbar loading={loading} />
          ) : (
            <Navbar loading={loading} />
          )
        ) : (
          <Navbar loading={loading} />
        )
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
          element={
            auth.isAuth == null ? (
              <h2>Loading...</h2>
            ) : auth.isAuth ? (
              isAdmin ? (
                <Navigate to="/admin" replace={true} />
              ) : (
                <Account setLoadingProgress={setLoadingProgress} />
              )
            ) : (
              <Navigate to="/auth/register" replace={true} />
            )
          }
        />
        <Route
          path="/user/account/profile"
          exact
          element={
            auth.isAuth == null ? (
              <h2>Loading</h2>
            ) : auth.isAuth ? (
              isAdmin ? (
                <Navigate to="/admin" replace={true} />
              ) : (
                <Profile setLoadingProgress={setLoadingProgress} />
              )
            ) : (
              <Navigate to="/auth/register" replace={true} />
            )
          }
        />
        <Route
          path="/admin"
          exact
          element={
            isAdmin == null ? (
              <h2>Loading...</h2>
            ) : isAdmin ? (
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
