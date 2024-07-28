import Product from "../Product";
import LoadingCard from "../LoadingCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/shadcnui/ui/button";
import { Loader2 } from "lucide-react";

const Featured = ({ setLoadingProgress }) => {
  const componentRef = useRef(null);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [isNextPossible, setIsNextPossible] = useState(false);
  const [isLoading, setIsLoadig] = useState(false);
  const getProducts = async (pageNumber) => {
    try {
      setLoadingProgress(30);
      setIsLoadig(true);
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/products/by?query=featured&page=${pageNumber}&limit=6`
        )
        .then((res) => {
          let { data } = res;

          if (data.next) {
            setIsNextPossible(true);
          } else {
            setIsNextPossible(false);
          }
          if (Array.isArray(products)) {
            setProducts([...products, ...data.products]);
          } else {
            setProducts(data.products);
          }
          setIsLoadig(false);
          setLoadingProgress(100);
        })
        .catch((err) => {
          setIsLoadig(false);
          setLoadingProgress(100);
          setProducts([]);
          console.log(err);
          alert("something went wrong");
        });
    } catch (err) {
      setIsLoadig(false);
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
          getProducts(page);
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
      <h3 className="text-2xl sm:text-3xl font-semibold">
        <span className="text-zinc-700 animate-pulse">Recently</span> Added
      </h3>
      <p className="text-sm mt-1 text-gray-500">Packed with Love ❤️</p>

      <div className="my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-self-center place-content-center place-items-center">
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
      {isNextPossible && (
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              isNextPossible && setPage((p) => p + 1);
              getProducts(page + 1);
            }}
            variant="outline"
            className="text-sm"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-3 h-3" />
            ) : (
              "Show More"
            )}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Featured;
