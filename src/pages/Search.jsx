import getSearchProducts from "@/Helper/search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingCard from "@/components/LoadingCard";
import Product from "@/components/Product";
import { Button } from "@/shadcnui/ui/button";
import { MoveDown } from "lucide-react";
const Search = () => {
  const [queryParameters] = useSearchParams();
  const text = queryParameters.get("q");
  const [searchRes, setSearchRes] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoadig] = useState(false);
  const [isNextPossible, setIsNextPossible] = useState(false);

  useEffect(() => {
    document.title = `search results for "${text}"`;
    if (text) {
      setIsLoadig(true);
      getSearchProducts(text, page, 8, setSearchRes);

      setIsLoadig(false);
    }
  }, [text]);

  useEffect(() => {
    if (text) {
      setIsLoadig(true);
      getSearchProducts(text, page, 8, setSearchRes);

      setIsLoadig(false);
    }
  }, [page]);

  if (!text) {
    return "404 error";
  }

  return (
    <>
      <section className="my-24" id="searchres">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-semibold">
            <span className="text-zinc-700 animate-pulse">Search</span> Results
          </h3>
          <p className="text-sm mt-1 text-gray-500">Packed with Love ❤️</p>

          <div className="my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-self-center place-content-center place-items-center">
            {searchRes == null ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : searchRes.products.length > 0 ? (
              searchRes.products.map((item) => {
                return <Product Text="From Search Results" product={item} />;
              })
            ) : (
              "No Search Results Found"
            )}
          </div>
          {isNextPossible && (
            <div className="flex items-center  justify-center">
              <Button
                onClick={() => {
                  isNextPossible && setPage((p) => p + 1);
                }}
                variant="outline"
                className="text-xs rounded-lg border-rose-300 bg-white/15 backdrop-blur-xl"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-3 h-3" />
                ) : (
                  <MoveDown className="w-3 h-3" />
                )}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
