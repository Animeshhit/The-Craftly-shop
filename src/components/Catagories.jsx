import React from "react";

const Catagories = () => {
  return (
    <>
      <section className="mt-8">
        <div className="container mx-auto px-4 sm:px-0 flex items-center flex-wrap gap-8">
          {Array.from({ length: 9 }).map((item, key) => {
            return (
              <div
                key={key}
                className="categories__div flex items-center justify-center flex-col w-max"
              >
                <img
                  src="https://picsum.photos/80/80"
                  className="rounded-full"
                  alt="image"
                />
                <p className="font-Karla mt-2 font-semibold">Categories one</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Catagories;
