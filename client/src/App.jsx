import AllProducts from "./pages/allProducts";
import LandingPage from "./pages/landingPage";
import Contact from "./pages/contact";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/shop" element={<AllProducts />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/:productID" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
