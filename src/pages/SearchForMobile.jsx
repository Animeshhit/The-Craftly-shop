import React, { useState, useEffect, useCallback } from "react";

import debounce from "lodash.debounce";
import getSearchProducts from "@/Helper/search";
import SearchProductCard from "@/components/SearchProductCard";
import { Input } from "@/shadcnui/ui/input";

const SearchForMobile = () => {
  const [mobileSearchInput, setMobileSearchInput] = useState("");
  const [searchResForMobile, setSearchResForMobile] = useState(null);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      getSearchProducts(searchTerm, 1, 10, setSearchResForMobile);
    }, 500),
    [] // The empty array makes sure the debounce function is created only once
  );
  return (
    <>
      <div
        className="fixed inset-x-0 overflow-auto py-3 px-4 bg-white inset-y-0"
        style={{ zIndex: 30000 }}
      >
        <div>
          <Input
            className="!outline-none text-sm rounded-full"
            placeholder="Search gifts..."
            autofocus
            value={mobileSearchInput}
            onChange={(e) => {
              setMobileSearchInput(e.target.value);
              if (e.target.value.length > 0) {
                debouncedSearch(e.target.value);
              }
            }}
          />
        </div>
        <div className="">
          {mobileSearchInput.length > 0 && (
            <div className=" search_sug_box mt-8">
              {searchResForMobile == null
                ? "Loading.. "
                : searchResForMobile.products.length > 0
                ? searchResForMobile.products.map((item, index) => {
                    return <SearchProductCard replace={true} product={item} />;
                  })
                : "No products Found"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchForMobile;
