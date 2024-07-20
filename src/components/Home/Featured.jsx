import Product from "../Product";
import LoadingCard from "../LoadingCard";

const Featured = ({ products }) => {
  return (
    <section className="mt-12">
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
