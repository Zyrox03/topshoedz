import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
// import { BestProducts } from "../../components/LandingPage/BestProducts";
import { Feature } from "../../components/LandingPage/Feature";
import { Feedback } from "../../components/LandingPage/Feedback";
import { Hero } from "../../components/LandingPage/Hero";
import { ProductsSection } from "../../components/LandingPage/ProductsSection";
import { NavBar } from "../../components/NavBar";
import { useSelector } from "react-redux";
import { SideNav } from "../../components/SideNav";

import { Helmet } from "react-helmet";
import MetaPixel from "../../utils/meta/metaPixel";


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

<Helmet>
  <title>Top Shoe DZ - Votre Boutique En Ligne</title>
  <meta name="description" content="Votre boutique en ligne de chaussures - Découvrez les meilleures offres sur nos produits." />
  
  {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
  <meta property="og:title" content="Top Shoe DZ - Votre Boutique En Ligne" />
  <meta property="og:description" content="Découvrez les meilleures offres sur une large gamme de produits dans notre boutique." />
  <meta property="og:image" content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg" />
  <meta property="og:url" content="https://topshoes-dz.pages.dev" />

  {/* Balises Twitter Card pour le partage sur Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Top Shoe DZ - Votre Boutique En Ligne" />
  <meta name="twitter:description" content="Découvrez les meilleures offres sur une large gamme de produits dans notre boutique." />
  <meta name="twitter:image" content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg" />

  {/* Balises méta supplémentaires */}
  <meta name="keywords" content="ecommerce, offres, shopping en ligne, produits" />
  <meta name="robots" content="index, follow" />

  {/* Balise meta viewport pour le design responsive */}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</Helmet>

<MetaPixel/>


      <NavBar setOpenSideNav={setOpenSideNav} isLanding />
      <SideNav
        setOpenSideNav={setOpenSideNav}
        openSideNav={openSideNav}
        isLanding
      />
      <Hero />
      {/* <BestProducts productsList={products} /> */}
      <ProductsSection productsList={products} />
      <Feature />
      <Feedback />
      <Footer />
    </div>
  );
};

export default LandingPage;
