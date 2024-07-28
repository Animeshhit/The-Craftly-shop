import Product from "../Product";
import LoadingCard from "../LoadingCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Featured = ({ setLoadingProgress }) => {
  const componentRef = useRef(null);
  const [products, setProducts] = useState(null);
  const getProducts = async () => {
    try {
      setLoadingProgress(30);
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/products/by?query=featured`
        )
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
    <section className="mt-12" ref={componentRef}>
      <h3 className="text-2xl sm:text-3xl font-semibold font-Karla">
        Newly <span className="text-blue-500">Added</span>
      </h3>
      <p className="font-Karla text-sm sm:text-base text-gray-500">
        Packed with Love ❤️
      </p>

      <div className="my-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products == null ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : products.length > 0 ? (
          products.map((item) => {
            if (item.isFeatured) {
              return <Product Text="Newly Added" product={item} />;
            }
          })
        ) : (
          "No Featured Products Found"
        )}
      </div>
    </section>
  );
};

export default Featured;
