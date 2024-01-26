import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Feedback } from "../../components/LandingPage/Feedback";
import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/sideNav";
import { Title } from "../../widgets/Title";
import { ProductCard } from "../../widgets/ProductCard";
import { useSelector } from "react-redux";
const AllProducts = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const productsList = useSelector(state=>state.products.items)

  useEffect(() => {
    const body = document.querySelector("body");
    if (openSideNav) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [openSideNav]);


  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">
      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{marginTop: '5em'}} >
        <div className="flex flex-col items-center gap-12 p-8">
        <Title
        title="Nos Produits"
        sub_title="Rejoignez la tendance avec notre sélection soigneusement choisie des styles les plus vendus."
      />

          <div className="flex justify-around items-center gap-12 flex-wrap">
            {productsList.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Feedback />
      <Footer />
    </div>
  );
};

export default AllProducts;
