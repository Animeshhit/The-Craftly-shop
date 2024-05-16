import { useEffect } from "react";
import { Arrivals, Featured, Hero } from "../components";

const Home = ({ setLoadingProgress }) => {
  useEffect(() => {
    setLoadingProgress(100);
  }, []);
  return (
    <>
      <Hero />
      <Featured />
      <Arrivals />
    </>
  );
};

export default Home;
