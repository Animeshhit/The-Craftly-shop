import Product from "../Product";
import LoadingCard from "../LoadingCard";

const BestSelling = ({ products }) => {
  return (
    <section className="mt-12">
      <h3 className="text-2xl sm:text-3xl font-semibold font-Karla">
        Best <span className="text-blue-500">Selling</span>
      </h3>
      <p className="font-Karla text-sm sm:text-base text-gray-500">
        People Gave Love ❤️
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
            if (item.isBestSeller) {
              return <Product Text="Best seller" product={item} />;
            }
          })
        ) : (
          "No Best Seller Product Found"
        )}
      </div>
    </section>
  );
};

export default BestSelling;
