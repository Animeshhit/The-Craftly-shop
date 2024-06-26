import React, { useEffect, useState } from "react";
import { Input } from "../../components";
import { NavLink } from "react-router-dom";
import { POST } from "../../../config/postFunction";
import { baseApiURL } from "../../../config/api";
import { useNavigate } from "react-router-dom";
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

      POST(`${baseApiURL}/auth/login`, { mobile, password })
        .then((data) => {
          if (data.status == 200) {
            console.log(data);
            localStorage.setItem("__token", data.token);
            dispatch(login(data.user));
            dispatch(setInitialItems(data.user.cart));
            setUserData(initialUserData);
            alert(data.message);
            navigate("/", { replace: true });
          } else if (data.status == 404) {
            setServerError(true);
            setDataError({ ...dataError, mobileError: "User not found!!" });
            setUserData({ ...userData, mobile: "" });
          } else if (data.status == 401) {
            setServerError(true);
            setDataError({ ...dataError, passwordError: "Incorrect Password" });
            setUserData({ ...userData, password: "" });
          } else {
            alert(data.message);
            setUserData(initialUserData);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
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
  return (
    <section className="login__screen mt-20">
      <div className="container mx-auto sm:px-0 px-4">
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
              <p className="text-sm font-Karla w-full text-center sm:text-left sm:w-3/5 mx-auto mt-2">
                Don't have an account?{" "}
                <NavLink
                  to="/auth/register"
                  className="text-blue-600 font-semibold font-Karla"
                >
                  Register now
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
