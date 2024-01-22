import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { BestProducts } from "../../components/LandingPage/BestProducts";
import { Feature } from "../../components/LandingPage/Feature";
import { Feedback } from "../../components/LandingPage/Feedback";
import { Hero } from "../../components/LandingPage/Hero";
import { ProductsSection } from "../../components/LandingPage/ProductsSection";
import { NavBar } from "../../components/NavBar";
import { useSelector } from "react-redux";
import { SideNav } from "../../components/sideNav";

const LandingPage = () => {
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (openSideNav) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [openSideNav]);

  const products = useSelector((state) => state.products.items);


  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">
      <NavBar setOpenSideNav={setOpenSideNav} isLanding />
      <SideNav
        setOpenSideNav={setOpenSideNav}
        openSideNav={openSideNav}
        isLanding
      />
      <Hero />
      <BestProducts productsList={products} />
      <Feature />
      <ProductsSection productsList={products} />
      <Feedback />
      <Footer />
    </div>
  );
};

export default LandingPage;
