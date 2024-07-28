//core modules
import { NavLink } from "react-router-dom";
import { useState } from "react";

//other modules
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/shadcnui/ui/command";

//redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  //redux
  const auth = useSelector((state) => state.auth);
  return (
    <header
      style={{ zIndex: "1000" }}
      className="shadow-md py-4 md:py-3 fixed top-0 inset-x-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              loading="lazy"
              className="w-5 h-5 object-contain"
              src="/logo.svg"
              alt="logo"
            />
            <span className=" text-xs sm:text-sm font-semibold">
              THE CRAFTLY SHOP
            </span>
          </NavLink>

          <form className="relative search__input  border-zinc-500 rounded-full hidden border-2 md:flex items-center flex-row-reverse justify-end">
            <div className="flex-center h-full pr-3 text-xl text-zinc-500">
              <ion-icon name="search-outline"></ion-icon>
            </div>
            <input
              className="h-full bg-inherit placeholder:text-zinc-500 text-sm font-Karla py-2 px-5 rounded-full outline-none"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              type="text"
              placeholder="Search for products..."
            />
          </form>

          <div className="flex items-center gap-3 md:gap-4">
            <NavLink
              to="/"
              className="md:hidden flex items-center justify-center text-2xl px-1 text-zinc-800"
            >
              <ion-icon name="search-outline"></ion-icon>
            </NavLink>
            <NavLink to="/" className="flex-center text-2xl px-1 text-zinc-800">
              <ion-icon name="heart-outline"></ion-icon>
            </NavLink>
            <NavLink to="/" className="flex-center text-2xl px-1 text-zinc-800">
              <ion-icon name="cart-outline"></ion-icon>
            </NavLink>
            {auth.isAuth == null ? (
              <div className="border-red-500 w-[40px] h-[40px] bg-zinc-800 rounded-full animate-pulse">
                {" "}
              </div>
            ) : auth.isAuth ? (
              ""
            ) : (
              <NavLink
                to="/auth/login"
                className="flex-center text-2xl px-1 text-zinc-800"
              >
                <ion-icon name="person-circle-outline"></ion-icon>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
