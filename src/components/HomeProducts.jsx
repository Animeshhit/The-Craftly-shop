import Featured from "../components/Home/Featured";
import BestSelling from "../components/Home/BestSelling";

const HomeProducts = ({ setLoadingProgress }) => {
  return (
    <div>
      <Featured setLoadingProgress={setLoadingProgress} />
      <BestSelling setLoadingProgress={setLoadingProgress} />
    </div>
  );
};

export default HomeProducts;
