import { NavLink } from "react-router-dom";
import Account from "../pages/Profile";
import { useLocation } from "react-router-dom";

//redux
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [cartContainer, setCartContainer] = useState(false);
  const [accountContainer, setAccountContainer] = useState(false);
  const [menubar, setMenuBar] = useState(false);

  useEffect(() => {
    setAccountContainer(false);
  }, [location.pathname]);
  return (
    <>
      <div
        className={`cart__container__overlay transition ${
          cartContainer ? "" : "translate-x-[120%]"
        } fixed top-0 left-0 right-0 bottom-0`}
        style={{ zIndex: 200 }}
      >
        <div className="cart__container absolute right-0 top-0 bottom-0 bg-white w-[350px] py-3 px-4">
          <div className="cart__container__header flex items-center justify-end">
            <div
              onClick={() => {
                setCartContainer(false);
              }}
              className="close__btn flex-center text-3xl cursor-pointer"
            >
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div className="cart__body my-3">
            {" "}
            {cart && cart.length > 0 ? (
              cart.map((item, index) => `item${index}`)
            ) : (
              <p className="text-center text-gray-400">Nothing is on Cart</p>
            )}
          </div>
        </div>
      </div>

      {/* cart container end   */}

      {/* account dropdown  */}

      <div
        className={`account__dropdown ${
          accountContainer ? "" : "hidden pointer-events-none"
        } fixed bg-white right-[4%] top-[70px]`}
        style={{ zIndex: 2000 }}
      >
        <NavLink
          to="/user/account/profile"
          className="block  my-1 hover:bg-zinc-300 px-6 py-2 transition"
        >
          Profile
        </NavLink>
        <NavLink
          to="/user/account/orders"
          className="flex items-center gap-3 my-1 hover:bg-zinc-300 px-6 py-2 transition"
        >
          <img width="20px" height="20px" src="/OrdersIcon.svg" alt="order" />
          Orders
        </NavLink>
        <NavLink
          to="/user/account/orders"
          className="flex items-center gap-3  my-1 hover:bg-zinc-300 px-6 py-2 transition"
        >
          <img
            width="20px"
            height="20px"
            src="/NotificationsIcon.svg"
            alt="Notifications"
          />
          Notifications
        </NavLink>
        <button
          type="button"
          className="flex items-center gap-3 w-full text-left my-1 hover:bg-zinc-300 px-6 py-2 transition"
        >
          <div className="icon w-[20px] h-[20px]">
            <ion-icon name="log-out-outline"></ion-icon>
          </div>
          Log Out
        </button>
      </div>

      {/* account dropdown menu end  */}
      <header className="sm:py-3 py-3 h-[120px] md:h-auto">
        <div className="container mx-auto ms:px-0 px-4">
          <div className="navbar__container flex items-center justify-between">
            <NavLink
              to="/"
              className="logo font-Karla font-semibold flex items-center gap-2"
            >
              <ion-icon name="storefront"></ion-icon>

              <span className="font-Karla">The Craftly Shop</span>
            </NavLink>
            <div
              className={`navbar__links transition-transform ${
                menubar ? "" : "-translate-x-full"
              } md:translate-x-0 flex md:relative fixed top-0 left-0 right-0 bottom-0 md:bg-transparent bg-zinc-800 h-screen md:h-auto`}
              style={{ zIndex: 3000 }}
            >
              <div
                onClick={() => {
                  setMenuBar(false);
                }}
                className="menu__close__btn flex md:hidden items-center justify-center text-white text-2xl absolute right-3 top-5"
              >
                <ion-icon name="close-outline"></ion-icon>
              </div>
              <ul className="flex items-center justify-center md:justify-normal flex-col md:flex-row gap-5 w-full md:w-auto">
                <li>
                  <NavLink
                    className="block py-3 px-1 text-sm md:text-zinc-900 md:hover:text-zinc-400 transition text-white font-Karla font-semibold"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-3 px-1 text-sm md:text-zinc-900 md:hover:text-zinc-400 transition text-white font-Karla font-semibold"
                    to="/"
                  >
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-3 px-1 text-sm md:text-zinc-900 md:hover:text-zinc-400 transition text-white font-Karla font-semibold"
                    to="/"
                  >
                    Offers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-3 px-1 text-sm md:text-zinc-900 md:hover:text-zinc-400 transition text-white font-Karla font-semibold"
                    to="/"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="navbar__right__container flex items-center sm:gap-8 gap-4">
              <form className="navbar__search-bar absolute left-0 right-0 md:relative md:w-[250px] md:flex  items-center w-full top-16 px-3 md:top-0 md:px-0 font-Karla text-sm">
                <div className="searchbar__icon absolute top-2.5 flex items-center justify-center left-6 md:left-4">
                  <ion-icon name="search"></ion-icon>
                </div>
                <input
                  type="text"
                  className="w-full h-full bg-gray-200 rounded-full border-red-500 pl-10 py-2 pr-4 outline-none"
                  placeholder="Search here"
                />
              </form>
              <div className="navbar__cta flex items-center gap-5">
                <div
                  className="navbar__cta__cart text-2xl flex-center cursor-pointer"
                  onClick={() => {
                    setCartContainer(true);
                  }}
                >
                  <ion-icon name="cart-outline"></ion-icon>
                </div>
                {auth.isAuth == null ? (
                  <div className="animate-pulse bg-gray-600 py-3 px-4 w-[100px] h-42"></div>
                ) : auth.isAuth ? (
                  auth.user.isAdmin ? (
                    <NavLink
                      to="/admin"
                      className="navbar__cta__account text-2xl flex-center"
                    >
                      <ion-icon name="person-circle-outline"></ion-icon>
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => {
                        setAccountContainer((state) => !state);
                      }}
                      className="navbar__cta__account text-2xl flex-center"
                    >
                      <ion-icon name="person-circle-outline"></ion-icon>
                    </button>
                  )
                ) : (
                  <NavLink
                    to="/auth/register"
                    className="navbar__cta__account text-2xl flex-center"
                  >
                    <ion-icon name="person-circle-outline"></ion-icon>
                  </NavLink>
                )}
              </div>
              <div
                className="navbar__menu md:hidden flex items-center justify-center text-2xl"
                onClick={() => {
                  setMenuBar(true);
                }}
              >
                <ion-icon name="menu-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
