import { lazy } from "react";

const Overview = lazy(() => import("./pages/admin/Overview"));
const Products = lazy(() => import("./pages/admin/Products"));
const Orders = lazy(() => import("./pages/admin/Orders"));
// const Settings = lazy(() => import("./pages/admin/Settings"));
const SpecialOffer = lazy(() => import("./pages/admin/SpecialOffer"));
const ProductDetailsAdmin = lazy(() => import("./pages/admin/ProductDetailsAdmin"));

const coreRoutes = [
  {
    path: "/admin/overview",
    title: "Aperçu",
    component: Overview,
    icon: <i className="fa-solid fa-tachometer-alt"></i>,
  },
  {
    path: "/admin/products",
    title: "Produits",
    component: Products,
    icon: <i className="fa-solid fa-box"></i>,
  },
  {
    path: "/admin/special-offer",
    title: "Offre Spéciale",
    component: SpecialOffer,
    icon: <i className="fa-solid fa-star"></i>,
  },
  {
    path: "/admin/orders",
    title: "Commandes",
    component: Orders,
    icon: <i className="fa-solid fa-shopping-cart"></i>,
  },
  // {
  //   path: "/admin/settings",
  //   title: "Settings",
  //   component: Settings,
  //   icon: <i className="fa-solid fa-gear"></i>,
  // },
  {
    path: "/admin/products/:productID", // Added the route segment for productID
    title: "Détails du produit",
    component: ProductDetailsAdmin,
    icon: <i className="fa-solid fa-box"></i>,
  },
];

const routes = [...coreRoutes];
export default routes;
