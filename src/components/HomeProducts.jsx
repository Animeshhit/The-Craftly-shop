import React, { useState, useEffect, useRef } from "react";
import Featured from "../components/Home/Featured";
import BestSelling from "../components/Home/BestSelling";
import axios from "axios";

const HomeProducts = ({ setLoadingProgress }) => {
  const [products, setProducts] = useState(null);
  const componentRef = useRef(null);
  const getProducts = async () => {
    try {
      setLoadingProgress(30);
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/products`)
        .then((res) => {
          setLoadingProgress(100);
          setProducts(res.data.products);
        })
        .catch((err) => {
          setLoadingProgress(100);
          setProducts([]);
          console.log(err);
          alert("something went wrong");
        });
    } catch (err) {
      setLoadingProgress(100);
      setProducts([]);
      console.log(err);
      alert("Network connection error");
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          getProducts();
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
    <div ref={componentRef}>
      <Featured products={products} />
      <BestSelling products={products} />
    </div>
  );
};

export default HomeProducts;
