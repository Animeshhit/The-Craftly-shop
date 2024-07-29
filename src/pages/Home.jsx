import FeedBack from "@/components/FeedBack";
import AltHero from "@/components/Home/AltHero";
import HomeProducts from "@/components/HomeProducts";

import { useEffect } from "react";

const Home = ({ setLoadingProgress }) => {
  useEffect(() => {
    document.title = "The Craftly Shop - Handcrafted & Premium Quality Gifts";
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 my-24">
        {/* <Hero /> */}
        <AltHero />
        {/* <Categories /> */}
        {/* <Banner /> */}
        <HomeProducts setLoadingProgress={setLoadingProgress} />
        <FeedBack />
      </div>
    </>
  );
};

export default Home;
