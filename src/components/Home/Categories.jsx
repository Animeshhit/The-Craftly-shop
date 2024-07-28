//core modules
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@/shadcnui/ui/skeleton";

//others
import axios from "axios";
import truncateText from "@/Helper/TextSpliter";

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
                  <Skeleton className="w-[80px] h-[80px] bg-zinc-300" />
                  <Skeleton className="w-[100px] h-4 bg-zinc-300 rounded-md mt-3" />
                </div>
              );
            })
          : ctgs.length > 0
          ? ctgs.map((item) => (
              <NavLink key={item._id} to="/" className="ctg_box">
                <div className="w-[40px] h-[40px] flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgba(0,0,0,0.5)"
                    viewBox="0 0 640 512"
                  >
                    <path d="M200.6 32C205 19.5 198.5 5.8 186 1.4S159.8 3.5 155.4 16L144.7 46.2l-9.9-29.8C130.6 3.8 117-3 104.4 1.2S85 19 89.2 31.6l8.3 25-27.4-20c-10.7-7.8-25.7-5.4-33.5 5.3s-5.4 25.7 5.3 33.5L70.2 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l152.6 0c-5.4-9.4-8.6-20.3-8.6-32l0-224c0-29.9 20.5-55 48.2-62c1.8-31 17.1-58.2 40.1-76.1C271.7 104.7 256.9 96 240 96l-22.2 0 28.3-20.6c10.7-7.8 13.1-22.8 5.3-33.5s-22.8-13.1-33.5-5.3L192.5 55.1 200.6 32zM363.5 185.5L393.1 224 344 224c-13.3 0-24-10.7-24-24c0-13.1 10.8-24 24.2-24c7.6 0 14.7 3.5 19.3 9.5zM272 200c0 8.4 1.4 16.5 4.1 24l-4.1 0c-26.5 0-48 21.5-48 48l0 80 192 0 0-96 32 0 0 96 192 0 0-80c0-26.5-21.5-48-48-48l-4.1 0c2.7-7.5 4.1-15.6 4.1-24c0-39.9-32.5-72-72.2-72c-22.4 0-43.6 10.4-57.3 28.2L432 195.8l-30.5-39.6c-13.7-17.8-35-28.2-57.3-28.2c-39.7 0-72.2 32.1-72.2 72zM224 464c0 26.5 21.5 48 48 48l144 0 0-128-192 0 0 80zm224 48l144 0c26.5 0 48-21.5 48-48l0-80-192 0 0 128zm96-312c0 13.3-10.7 24-24 24l-49.1 0 29.6-38.5c4.6-5.9 11.7-9.5 19.3-9.5c13.4 0 24.2 10.9 24.2 24z" />
                  </svg>
                </div>
                <p className="text-nowrap">{truncateText(item.name, 10)}</p>
              </NavLink>
            ))
          : "No Categories Are Available Right Now"}
      </div>
    </>
  );
};

export default Categories;
