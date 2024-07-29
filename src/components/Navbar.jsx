//core modules
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/shadcnui/ui/tooltip";

import { MoveRight, LogOut } from "lucide-react";

import { Button } from "@/shadcnui/ui/button";

//kinde
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Skeleton } from "@/shadcnui/ui/skeleton";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { login, register, user, logout, isLoading, isAuthenticated } =
    useKindeAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <header
      style={{ zIndex: "1000" }}
      className="shadow-md py-2 md:py-3 fixed top-0 inset-x-0 w-full border-b border-gray-200 bg-white/65 backdrop-blur-lg transition-all"
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

          <div className="flex items-center gap-3 ">
            {/* search Icon for the phone user  */}
            {/* <NavLink
              to="/"
              className="md:hidden flex items-center justify-center text-2xl px-1 text-zinc-800"
            >
              <ion-icon name="search-outline"></ion-icon>
            </NavLink> */}

            {/* Cart and watchlist  */}
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/"
                    className="flex-center text-xl px-1 text-zinc-800"
                  >
                    <ion-icon name="heart-outline"></ion-icon>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent>Coming soon</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/"
                    className="flex-center text-xl px-1 text-zinc-800"
                  >
                    <ion-icon name="cart-outline"></ion-icon>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent>Comin soon</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            {isLoading ? (
              <>
                <Skeleton className="w-[100px] h-10 bg-zinc-400" />
                <Skeleton className="w-[100px] h-10 bg-zinc-400" />
              </>
            ) : isAuthenticated ? (
              <>
                <div className="w-8 h-8 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src={user.picture}
                    alt={user.given_name}
                  />
                </div>
                <Button
                  variant="outline"
                  className="text-xs flex items-center gap-2"
                  onClick={logout}
                >
                  Sign out
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-xs hidden sm:flex bg-transparent backdrop-blur-lg"
                  onClick={login}
                >
                  Log in
                </Button>
                <Button
                  onClick={register}
                  className="bg-rose-500 text-xs hover:bg-rose-400 flex items-center gap-2 transition"
                >
                  Create account
                  <MoveRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
