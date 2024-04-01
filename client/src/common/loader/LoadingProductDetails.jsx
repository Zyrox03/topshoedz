import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
   import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/SideNav";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingProductDetails = () => {
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (openSideNav) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [openSideNav]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">

      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{ marginTop: "8em" }}>

      <div className="p-4 lg:p-8 flex flex-col gap-2">

    <div className="flex justify-end">
    <Skeleton count={1} className="h-10 w-96" baseColor="#f5f5f5" highlightColor="#ebebeb"/>

    </div>
          <hr />

          <div className="flex flex-col md:flex-row relative gap-4">
            <div className="flex-1 h-full md:w-1/2 flex justify-center items-center sticky top-0 h-fit">
              <div className=" w-full">
                <Skeleton count={1} className="h-[50vh] " baseColor="#f5f5f5" highlightColor="#ebebeb"/>
</div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
             
                <button className="lg:hidden w-full flex items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95">
                  <i className="text-lg fa-solid fa-shopping-cart"></i>
                  <p className="text-lg font-bold">شراء</p>
                </button>
              <div
                dir="rtl"
                className="flex h-fit w-full items-center flex-wrap gap-2"
              >

<Skeleton count={1} className="h-10 w-64" baseColor="#f5f5f5" highlightColor="#ebebeb"/>

              </div>
              <div className="flex h-fit w-full items-end flex-col ">
                <h2 className="text-3xl mb-4">
                  👇
                  <span className="text-purple-800 underline font-bold">
                    {" "}
                    المواصفات{" "}
                  </span>{" "}
                  👇
                </h2>

<div className="w-full h-full">

                <Skeleton style={{lineHeight: '5px'}} count={5} className="h-5 " baseColor="#f5f5f5" highlightColor="#ebebeb"/>
                </div>
             
              </div>     
              </div>     
              </div>     
              </div>     
      </div>
      <Footer />
    </div>
  );
};

export default LoadingProductDetails;
