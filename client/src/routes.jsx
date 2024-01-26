import { lazy } from "react";

const Overview = lazy(() => import("./pages/admin/Overview"));
const Products = lazy(() => import("./pages/admin/Products"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const ProductDetailsAdmin = lazy(() => import("./pages/admin/ProductDetailsAdmin"));

const coreRoutes = [
  {
    path: "/admin/overview",
    title: "Overview",
    component: Overview,
    icon: <i className="fa-solid fa-tachometer-alt"></i>,
  },
  {
    path: "/admin/products",
    title: "Products",
    component: Products,
    icon: <i className="fa-solid fa-box"></i>,
  },
  {
    path: "/admin/settings",
    title: "Settings",
    component: Settings,
    icon: <i className="fa-solid fa-gear"></i>,
  },
  {
    path: "/admin/products/:productID", // Added the route segment for productID
    title: "Product Details",
    component: ProductDetailsAdmin,
    icon: <i className="fa-solid fa-box"></i>,
  },
];

const routes = [...coreRoutes];
export default routes;
