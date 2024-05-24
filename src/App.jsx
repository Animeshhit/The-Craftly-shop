import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar, Footer, Loading, NetworkError } from "./components";
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
import AdminLoading from "./pages/Loading/AdminLoading";
import AuthMiddleware from "./pages/MiddalwarePages/AuthMiddalware";
import AdminMiddleware from "./pages/MiddalwarePages/AdminMiddalware";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/Slices/authSlice";
import { setInitialItems } from "./store/Slices/cartSlice";

const App = () => {
  //redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
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

      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              {auth.isAuth == null ? (
                <div className="w-full h-[60px] bg-zinc-700 animate-pulse"></div>
              ) : (
                <Navbar />
              )}
              <Home setLoadingProgress={setLoadingProgress} loading={loading} />
            </>
          }
        />
        <Route
          path="/auth/register"
          exact
          element={
            <AuthMiddleware
              component={Regiser}
              authRequired={false}
              redirect="/"
              setLoadingProgress={setLoadingProgress}
            />
          }
        />
        <Route
          path="/auth/login"
          exact
          element={
            <AuthMiddleware
              component={Login}
              redirect="/"
              authRequired={false}
              setLoadingProgress={setLoadingProgress}
            />
          }
        />
        <Route
          path="/user/account"
          exact
          element={
            <AuthMiddleware
              component={Account}
              redirect="/auth/register"
              authRequired={true}
              setLoadingProgress={setLoadingProgress}
            />
          }
        />
        <Route
          path="/user/account/profile"
          exact
          element={
            <AuthMiddleware
              component={Profile}
              redirect="/auth/register"
              authRequired={true}
              setLoadingProgress={setLoadingProgress}
            />
          }
        />
        <Route
          path="/admin"
          exact
          element={
            <AdminMiddleware
              loadingComponent={AdminLoading}
              component={MyShop}
              redirect="/user/account"
              setLoadingProgress={setLoadingProgress}
              loading={loading}
            />
          }
        />
        <Route
          path="/admin/orders"
          exact
          element={
            <AdminMiddleware
              loadingComponent={<h2>loading...</h2>}
              component={Orders}
              redirect="/user/orders"
              setLoadingProgress={setLoadingProgress}
              loading={loading}
            />
          }
        />
        <Route
          path="/admin/users"
          exact
          element={
            <AdminMiddleware
              loadingComponent={<h2>loading...</h2>}
              component={Users}
              redirect="/"
              setLoadingProgress={setLoadingProgress}
              loading={loading}
            />
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
