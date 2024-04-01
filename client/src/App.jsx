import AllProducts from "./pages/allProducts";
import LandingPage from "./pages/landingPage";
import Contact from "./pages/contact";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import routes from "./routes";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./common/loader";
import DashboardCards from "./pages/admin/DashboardCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./toolkit/productSlice";
import Auth from "./pages/auth";
import LoadingProductDetails from "./common/loader/LoadingProductDetails";

const ProductDetails = lazy(() => import("./pages/productDetails"));

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ element }) => {
  const isAdmin = useSelector((state) => state.auth.admin);

  if (!isAdmin) {
    // Redirect to account route if not an admin
    return <Navigate to="/account" />;
  }

  // Render the component for admin
  return element;
};

const AccountRoute = () => {
  const isAdmin = useSelector((state) => state.auth.admin);

  if (isAdmin) {
    // If isAdmin is true, navigate to the admin route
    return <Navigate to="/admin" />;
  } else {
    return <Auth />;
  }
};


function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    // Dispatch the fetchProducts action when the component mounts
  dispatch(fetchProducts())
  }, [dispatch]);


  if (!products) {
    return <div className="h-screen w-full flex justify-center items-center">
      <img src="/logo.jpg" className="max-w-32" alt="store logo" />
    </div>;
  }

  return (

    <>
    
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin" element={<AdminRoute element={<Dashboard />} />}>
      <Route index element={<AdminRoute element={<DashboardCards />} />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <AdminRoute element={<Component />} />
                  </Suspense>
                }
              />
            );
          })}
        </Route>

      <Route path="/shop" element={<AllProducts />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/cart" element={<Cart />} /> */}
      <Route path="/account" element={<AccountRoute />} />
      <Route
          path="/:productID"
          element={
            <Suspense fallback={<LoadingProductDetails />}>
              <ProductDetails />
            </Suspense>
          }
        />    </Routes>
    </>

  );
}

export default App;
