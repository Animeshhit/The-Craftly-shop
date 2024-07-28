import AltHero from "@/components/Home/AltHero";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import Hero from "../components/Home/Hero";
import HomeProducts from "@/components/HomeProducts";

const Home = ({ setLoadingProgress }) => {
  return (
    <>
      <div className="container mx-auto px-4 my-24">
        {/* <Hero /> */}
        <AltHero />
        {/* <Categories /> */}
        {/* <Banner /> */}
        <HomeProducts setLoadingProgress={setLoadingProgress} />
      </div>
    </>
  );
};

export default Home;
