import { useEffect } from "react";
import { Arrivals, Featured, Hero, Catagories } from "../components";

const Home = ({ setLoadingProgress }) => {
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  return (
    <>
      <Hero />
      <Catagories />
      <Arrivals />
    </>
  );
};

export default Home;
