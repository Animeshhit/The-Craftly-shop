// core modules
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// other modules
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Error from "./pages/Error";
import { Toaster } from "@/shadcnui/ui/sonner";
import Footer from "./components/Footer";
import Search from "./pages/Search";
// import Profile from "./pages/Profile";
// import Account from "./pages/Account";

const App = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        style={{ zIndex: "2000" }}
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      <Toaster />
      <Navbar />
      <div className="bg-graphic"></div>
      <Routes>
        <Route
          path="/"
          element={<Home setLoadingProgress={setLoadingProgress} />}
        />

        <Route
          path="/product/:text/:id"
          element={<ProductView setLoadingProgress={setLoadingProgress} />}
        />
        <Route
          path="/search"
          element={<Search setLoadingProgress={setLoadingProgress} />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
