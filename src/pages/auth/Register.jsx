//core
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//others
import Input from "./InputForAuth";

//redux
import { useDispatch } from "react-redux";
import { register } from "../../store/Slices/authSlice";
import { setInitialItems } from "../../store/Slices/cartSlice";
import axios from "axios";

const Register = ({ setLoadingProgress }) => {
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();
  const initialError = {
    mobileError: null,
    passwordError: null,
  };
  const initialUserData = {
    mobile: "",
    password: "",
  };
  const [dataError, setDataError] = useState(initialError);
  const [userData, setUserData] = useState(initialUserData);
  const [registerBtn, setRegisterBtn] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(dataError);
  }, [dataError]);

  // register user ================================>

  const registerUser = async (e) => {
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
      setRegisterBtn(true);

      axios
        .post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/register`, {
          mobile,
          password,
        })
        .then((res) => {
          let { data } = res;
          localStorage.setItem("__token", data.token);
          dispatch(register(data.user));
          dispatch(setInitialItems(data.user.cart));
          setUserData(initialUserData);
          //toast
          alert(data.message);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          let { response } = err;
          let { data } = response;
          if (response.status == 403) {
            setServerError(true);
            setDataError({ ...dataError, mobileError: `${data.message}` });
            setUserData({ ...userData, password: "" });
          } else {
            setUserData(initialUserData);
            //toast
            alert(err.message);
          }
        });
    } catch (err) {
      setUserData(initialUserData);
      //toast
      alert("Network connection error");
    } finally {
      setLoadingProgress(100);
      setRegisterBtn(false);
    }
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
    <>
      <section className="register__screen my-36">
        <div className="container mx-auto px-4 sm:px-0 h-full">
          <div className="flex flex-col sm:flex-row items-center h-full">
            <div className="left__container w-[100px] h-[100px] sm:w-1/3 md:w-1/2 hidden sm:flex items-center justify-center sm:h-[500px]">
              <img
                src="/Register.svg"
                alt="register here"
                className="w-full h-full"
              />
            </div>
            <div className="right__container w-full sm:w-2/3 md:w-1/2">
              <h1 className="font-Karla font-bold text-2xl sm:text-3xl">
                Register here
              </h1>
              <p className="text-xs sm:text-sm mt-3 leading-6 sm:pr-24">
                "Welcome to{" "}
                <strong className="text-blue-600">The Craftly shop</strong>{" "}
                We're excited to have you onboard. Start exploring and
                connecting with others to make the most out of your experience!"
              </p>
              <form className="main__screen my-8" onSubmit={registerUser}>
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
                  type="submit"
                  disabled={registerBtn}
                  className="w-full sm:w-3/4 bg-zinc-800 hover:bg-zinc-600 transition text-white py-3 px-4 text-sm rounded-md mt-8"
                >
                  Register
                </button>
                <div className="text-sm font-Karla w-full sm:w-3/4  mt-2 text-center">
                  <p className="text-center">
                    Already have an account?{" "}
                    <NavLink
                      to="/auth/login"
                      className="text-blue-600 font-semibold font-Karla"
                    >
                      Login now
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
