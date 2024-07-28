//core
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

//others
import Input from "./InputForAuth";
import axios from "axios";

//redux
import { useDispatch } from "react-redux";
import { login } from "../../store/Slices/authSlice";
import { setInitialItems } from "../../store/Slices/cartSlice";

const Login = ({ setLoadingProgress }) => {
  const navigate = useNavigate();
  //reudux
  const dispatch = useDispatch();
  const initialUserData = {
    mobile: "",
    password: "",
  };
  const initialError = {
    mobileError: null,
    passwordError: null,
  };
  const [userData, setUserData] = useState(initialUserData);
  const [dataError, setDataError] = useState(initialError);
  const [loginBtn, setLoginBtn] = useState(false);
  const [serverError, setServerError] = useState(false);

  // login in user ====================================

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let { mobile, password } = userData;

      if (!mobile) {
        setDataError({
          ...dataError,
          mobileError: "Please enter a valid mobile number",
        });
        return;
      }

      if (mobile.length < 10 || mobile.length > 10) {
        setDataError({
          ...dataError,
          mobileError: "Please Enter a valid mobile number",
        });
        return;
      }

      if (!password) {
        setDataError({
          ...dataError,
          passwordError: "Please enter a password",
        });
        return;
      }

      if (password.length < 8) {
        setDataError({
          ...dataError,
          passwordError: "Password should be length of 8",
        });
        return;
      }

      setDataError(initialError);

      setLoadingProgress(20);
      setLoginBtn(true);

      axios
        .post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/login`, {
          mobile,
          password,
        })
        .then((res) => {
          let { data } = res;
          localStorage.setItem("__token", data.token);
          dispatch(login(data.user));
          dispatch(setInitialItems(data.user.cart));
          setUserData(initialUserData);
          //use toast from shadcn
          alert(data.message);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          let { response } = err;
          let { data } = response;
          if (response.status == 404) {
            setServerError(true);
            setDataError({ ...dataError, mobileError: "User not found!!" });
            setUserData({ ...userData, mobile: "" });
          } else if (response.status == 401) {
            setServerError(true);
            setDataError({ ...dataError, passwordError: "Incorrect Password" });
            setUserData({ ...userData, password: "" });
          } else {
            //use toast
            alert(data.message);
            setUserData(initialUserData);
          }
        });
    } catch (err) {
      //toast
      setUserData(initialUserData);
      alert("Network connection error");
    } finally {
      setLoadingProgress(100);
      setLoginBtn(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  useEffect(() => {
    if (serverError) {
      return;
    }
    setDataError(initialError);
  }, [userData.mobile, userData.password]);

  useEffect(() => {
    setTimeout(() => {
      setServerError(false);
    }, 900);
  }, [serverError]);

  useEffect(() => {
    document.title = "Login | The Craftly Shop";
  }, []);

  return (
    <section className="login__screen my-36">
      <div className="container mx-auto  px-4">
        <div className="flex items-center">
          <div className="left__container w-1/2 hidden sm:flex items-center justify-center h-[300px]">
            <img src="/Login.svg" alt="login here" className="w-full h-full" />
          </div>
          <div className="right__container w-full md:w-1/2">
            <h1 className="font-Karla font-bold text-2xl sm:text-3xl">Login</h1>
            <p className="font-Karla text-xs sm:text-sm mt-3 leading-6">
              "Welcome to our shopping website login! Sign in to access your
              account and enjoy seamless browsing, secure transactions, and
              personalized shopping experiences."
            </p>
            <form className="main__screen my-8" onSubmit={loginUser}>
              <Input
                Id="mobile"
                Label="Mobile"
                Type="Number"
                PlaceHolder="e.g 8637XX84X4"
                InputStyles="w-full sm:w-3/4"
                name="mobile"
                Value={userData.mobile}
                handleChange={handleChange}
                Error={dataError.mobileError}
              />
              <Input
                Id="password"
                Label="Password"
                Type="password"
                PlaceHolder="Password"
                InputStyles="w-full sm:w-3/4"
                ContainerStyles="mt-4"
                name="password"
                Value={userData.password}
                handleChange={handleChange}
                Error={dataError.passwordError}
              />
              <button
                disabled={loginBtn}
                type="submit"
                className="w-full sm:w-3/4 bg-zinc-800 hover:bg-zinc-600 transition text-white py-3 px-4 text-sm rounded-md mt-8"
              >
                Login
              </button>
              <div className="mt-3 text-sm text-center font-Karla w-full sm:w-3/4">
                <p>
                  Don't have an account?{" "}
                  <NavLink
                    to="/auth/register"
                    className="text-blue-600 font-semibold font-Karla"
                  >
                    Register now
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
