import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { SideNav } from "../components/SideNav";
import { Link, useLocation } from "react-router-dom";
import MetaPixel from "../utils/meta/metaPixel";

const OrderSuccess = () => {
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const order_id = queryParams.get("order_id");

  return (
    <div className="h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">

      <MetaPixel/>
      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div
        style={{ marginTop: "10em" }}
        className="flex flex-col gap-4 items-center justify-center p-6 text-center "
      >
        <h1 className="text-4xl font-bold text-purple-800 mb-4">
          شكرًا لطلبك!
        </h1>
        <p className="text-gray-600">
          سنتصل بك قريبًا لتأكيد التفاصيل وتنظيم التسليم.
        </p>

        <span>{order_id} </span>

        <Link to="/">
          <button className="bg-purple-800 flex w-full justify-center items-center gap-2 text-white disabled:bg-purple-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-blue">
            <i className="fa-solid fa-hand-point-left"></i>{" "}
            <p className="text-lg font-bold">العودة</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
