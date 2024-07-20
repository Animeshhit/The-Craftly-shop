//core modules
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@/shadcnui/ui/skeleton";

//others
import axios from "axios";

const Categories = () => {
  const [ctgs, setCtgs] = useState(null);
  const componentRef = useRef(null);
  const getCts = async () => {
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/categories`)
        .then((res) => {
          setCtgs(res.data);
        })
        .catch((err) => {
          console.log(err);
          setCtgs([]);
          alert("something went wrong");
        });
    } catch (err) {
      setCtgs([]);
      console.log(err);
      alert("network connection error");
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          getCts();
          observer.disconnect(); // Disconnect after the API call is made
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);
  return (
    <>
      <div
        ref={componentRef}
        className="flex items-center justify-around mt-8 flex-nowrap overflow-auto gap-3"
      >
        {ctgs == null
          ? Array.from({ length: 6 }).map(() => {
              return (
                <div className="ctg_box">
                  <Skeleton className="w-[80px] h-[80px] bg-zinc-800" />
                  <Skeleton className="w-[100px] h-4 bg-zinc-800 rounded-md mt-3" />
                </div>
              );
            })
          : ctgs.length > 0
          ? ctgs.map((item) => (
              <NavLink key={item._id} to="/" className="ctg_box">
                <div className="w-[80px] h-[80px] bg-zinc-800 flex-center">
                  <span className="font-Karla text-white text-sm">80X80</span>
                </div>
                <p className="text-nowrap">{item.name}</p>
              </NavLink>
            ))
          : "No Categories Are Available Right Now"}
      </div>
    </>
  );
};

export default Categories;
