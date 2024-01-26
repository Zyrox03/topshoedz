import AllProducts from "./pages/allProducts";
import LandingPage from "./pages/landingPage";
import Contact from "./pages/contact";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";
import Dashboard from "./layouts/Dashboard";
import routes from "./routes";
import { Suspense } from "react";
import Loader from "./common/loader";
import DashboardCards from "./pages/admin/DashboardCards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route  path="/admin" element={<Dashboard />}>
          <Route index element={<DashboardCards />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>


      <Route path="/shop" element={<AllProducts />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/:productID" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
