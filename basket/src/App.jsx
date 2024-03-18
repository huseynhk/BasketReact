import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Basket from "./components/Basket";
import { Routes, Route } from "react-router-dom";
import { ROUTER } from "./constant/router";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={ROUTER.Product} element={<Product />} />
        <Route
          path={ROUTER.ProductDetail + "/:id"}
          element={<ProductDetail />}
        />
        <Route path={ROUTER.Basket} element={<Basket />} />
        <Route path={`${ROUTER.About}/*`} element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
