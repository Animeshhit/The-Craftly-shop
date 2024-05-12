import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar, Footer, AdminNavbar } from "./components";
import { useEffect, useState } from "react";
import MyShop from "./pages/adminPages/MyShop";
import Orders from "./pages/adminPages/Orders";
import Users from "./pages/adminPages/Users";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  return (
    <>
      {pathName == "/admin" ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={isAdmin ? <MyShop /> : <Home />} />
        <Route path="/admin/orders" element={isAdmin ? <Orders /> : <Home />} />
        <Route path="/admin/users" element={isAdmin ? <Users /> : <Home />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
