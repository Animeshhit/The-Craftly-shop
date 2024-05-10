import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar, Footer } from "./components";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
