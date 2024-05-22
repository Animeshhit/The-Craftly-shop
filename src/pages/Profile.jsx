import { useEffect, useState } from "react";
import { Input, Button } from "../components";
//api
import { baseApiURL } from "../../config/api";
import { POST } from "../../config/postFunction";
//redux

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/Slices/authSlice";

const Profile = ({ setLoadingProgress }) => {
  const initialData = {
    username: "",
    email: "",
    mobile: "",
  };
  const [profile, setProfile] = useState(initialData);
  const [updateBtn, setUpdateBtn] = useState(false);
  //redux
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuth) {
      const { user } = auth;
      setProfile({
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("__token");
      if (!token) {
        return;
      }
      setLoadingProgress(30);
      setUpdateBtn(true);
      let apiUrl = `${baseApiURL}/auth/updateProfile?apikey=${token}`;
      POST(apiUrl, profile)
        .then((data) => {
          console.log(data);
          if (data.status == 200) {
            dispatch(getUser({ isAuth: true, user: data.user }));
            alert(data.message);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong please try again later");
        });
      setLoadingProgress(70);
    } catch (err) {
      const { user } = auth;
      setProfile({
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      });
      console.log(err);
      alert("something went wrong please try again later");
    } finally {
      setLoadingProgress(100);
      setUpdateBtn(false);
    }
  };

  return (
    <>
      <section className="my-24 relative">
        <div className="side__image hidden lg:flex absolute right-16 -top-6 w-[520px] h-[520px]">
          <img
            src="/AccountFull.svg"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="container ml-auto px-4">
          <h1 className="font-Karla font-bold text-2xl">
            Change Your Profile Information
          </h1>
          <p className="font-Karla text-gray-600 w-full sm:max-w-md my-3 text-sm">
            Easily update and customize your profile with our intuitive
            interface for accurate representation.
          </p>

          <form className="main__screen my-8" onSubmit={updateProfile}>
            <Input
              Id="username"
              Label="Username"
              Type="text"
              PlaceHolder="john doe"
              Value={profile.username}
              InputStyles="w-full md:w-2/5 bg-gray-200"
              name="username"
              handleChange={handleChange}
            />
            <Input
              Id="email"
              ContainerStyles="my-4"
              Label="Email"
              Type="email"
              PlaceHolder="test@234gmail.com"
              Value={profile.email}
              InputStyles="w-full md:w-2/5 bg-gray-200"
              name="email"
              handleChange={handleChange}
            />
            <Input
              Id="mobile"
              ContainerStyles="my-4"
              Label="Phone"
              Type="Number"
              PlaceHolder="863XX584XX"
              Value={profile.mobile}
              InputStyles="w-full md:w-2/5 bg-gray-200"
              name="mobile"
              handleChange={handleChange}
            />
            <Button
              disabled={updateBtn}
              Type="submit"
              Text="Update Profile"
              styles="my-6 w-full md:w-2/5 rounded-md"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
