import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [navbarState, setNabarState] = useState(false);

  return (
    <header className="shadow-lg py-4">
      <div className="container mx-auto sm:px-0 px-4">
        <div className="navbar__container flex items-center justify-between">
          <div className="navbar__logo">
            <h2 className="text-2xl font-Karla font-bold py-3">Hello, Admin</h2>
          </div>
          <nav
            className={`fixed ${
              navbarState ? "" : "-translate-x-full md:translate-x-0"
            } transition w-full sm:w-1/2 top-0 left-0 bottom-0 md:bg-white flex items-center justify-center md:justify-end bg-zinc-900 z-10 md:relative`}
          >
            <ul className="flex md:flex-row flex-col items-center gap-4">
              <li>
                <NavLink
                  to="/admin/users"
                  className="py-2 px-3  block font-semibold text-white md:text-zinc-800 hover:text-gray-400 md:hover:text-zinc-500"
                >
                  Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin/orders"
                  className="py-2 px-3  block font-semibold text-white md:text-zinc-800 hover:text-gray-400 md:hover:text-zinc-500"
                >
                  Orders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin"
                  className="py-2 px-3  block font-semibold text-white md:text-zinc-800 hover:text-gray-400 md:hover:text-zinc-500"
                >
                  My Shop
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/"
                  className="py-3 px-6 bg-white block md:bg-zinc-900 text-zinc-900 md:text-white rounded-full"
                >
                  Login as Customer
                </NavLink>
              </li>
              <div
                onClick={() => {
                  setNabarState(false);
                }}
                className="flex sm:hidden items-center justify-center text-3xl text-white absolute right-10 top-10"
              >
                <ion-icon name="close-outline"></ion-icon>
              </div>
            </ul>
          </nav>
          <div
            className="navbar__menu flex-center text-3xl md:hidden cursor-pointer"
            onClick={() => {
              setNabarState((state) => !state);
            }}
          >
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
