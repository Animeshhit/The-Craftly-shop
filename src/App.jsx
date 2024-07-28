// core modules
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// other modules
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Error from "./pages/Error";
import { Toaster } from "@/shadcnui/ui/sonner";
import AuthMiddleware from "./MiddalwarePages/AuthMiddalware";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/Profile";
import Account from "./pages/Account";

import axios from "axios";

// import MyShop from "./pages/adminPages/MyShop";
// import Orders from "./pages/adminPages/Orders";
// import Users from "./pages/adminPages/Users";

// import AdminProductPage from "./pages/adminPages/Product";

// import AdminLoading from "./pages/Loading/AdminLoading";
// import ProductLoading from "./pages/Loading/ProductLoading";

// import AdminMiddleware from "./pages/MiddalwarePages/AdminMiddalware";

//redux
import { useDispatch } from "react-redux";
import { getUser } from "./store/Slices/authSlice";
import { setInitialItems } from "./store/Slices/cartSlice";

const App = () => {
  // for Loading Bar
  const [loadingProgress, setLoadingProgress] = useState(0);

  // redux
  const dispatch = useDispatch();

  // Loging in user ===================================================>

  const LoggedInUser = async () => {
    // if request error then say only network connection error
    // if apireq == 200 then only do something otherwise don't give response
    // server is giving response but don't show that.
    try {
      // check token is valid or not if valid go ahead if not valid then return but give no feedback
      let token = localStorage.getItem("__token");
      if (!token) {
        dispatch(getUser({ isAuth: false, user: null }));
        return;
      }
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let { data } = res;
          dispatch(getUser({ isAuth: true, user: data.user }));
          dispatch(setInitialItems(data.user.cart));
        })
        .catch((err) => {
          console.log(err);
          dispatch(getUser({ isAuth: false, user: null }));
        });
    } catch (err) {
      dispatch(getUser({ isAuth: false, user: null }));
      console.log(err);
      alert("Network Connection Error");
    }
  };

  useEffect(() => {
    LoggedInUser();
  }, []);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        style={{ zIndex: "2000" }}
        onLoaderFinished={() => setLoadingProgress(0)}
      />

      <Navbar />
      <div className="bg-graphic"></div>
      <Routes>
        <Route
          path="/"
          element={<Home setLoadingProgress={setLoadingProgress} />}
        />

        <Route
          path="/auth/register"
          element={
            <AuthMiddleware
              component={Register}
              authRequired={false}
              redirect="/"
              setLoadingProgress={setLoadingProgress}
            />
          }
        />
        <Route
          path="/auth/login"
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
          path="/product/:text/:id"
          element={<ProductView setLoadingProgress={setLoadingProgress} />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Toaster />

      {/* <Routes>
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
              loadingComponent={UsersLoading}
              component={Users}
              redirect="/"
              setLoadingProgress={setLoadingProgress}
              loading={loading}
            />
          }
        />
        <Route
          path="/admin/product/:id"
          exact
          element={
            <AdminMiddleware
              loadingComponent={ProductLoading}
              component={AdminProductPage}
              redirect={"/"}
              setLoadingProgress={setLoadingProgress}
              loading={loading}
            />
          }
        />
        <Route
          path="/product/:id"
          exact
          element={
            <AuthMiddleware
              component={<ProductDes />}
              redirect="/"
              authRequired={false}
              setLoadingProgress={setLoadingProgress}
            />
          }
        />
       
      </Routes> */}
      {/* <Footer /> */}
    </>
  );
};

export default App;
