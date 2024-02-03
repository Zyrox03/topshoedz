import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setAdmin } from "../toolkit/authSlice";
import { useDispatch } from "react-redux";

export const DashboardNav = ({ activeLink, sidebar, setSidebar }) => {
  const [dropdown, setDropDown] = useState(false);

  const dispatch = useDispatch();
  return (
    <div
      className="h-[4em] rounded-lg flex items-center p-2 w-full"
      style={{ zIndex: 1 }}
    >
      <h1 className="text-3xl font-semibold">{activeLink} </h1>

      <div className="ml-auto relative flex gap-2 items-center">
        <div
          onClick={() => setSidebar(!sidebar)}
          className="lg:hidden cursor-pointer"
        >
          <i className="fa-solid fa-bars"></i>{" "}
        </div>

        <div onClick={() => setDropDown(!dropdown)} className="">
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src="/logo.jpg"
            alt=""
          />
        </div>

        {dropdown && (
          <div 
            style={{ backgroundColor: "#1C2434" }}
            className="absolute top-[150%]  right-0 w-64 text-slate-100 p-2 rounded-3xl "
          >
            <ul className="flex flex-col gap-2 ">
              <Link onClick={() => setDropDown(false)} to="/admin">
                <li className="p-2 rounded-xl transition hover:bg-purple-700 cursor-pointer">
                Tableau de bord
                </li>
              </Link>
              <Link onClick={() => setDropDown(false)} to="/">
                <li className="p-2 rounded-xl transition hover:bg-purple-700 cursor-pointer">
                Aller au magasin
                                </li>
              </Link>
              <li
                onClick={() => dispatch(setAdmin(null))}
                className="p-2 rounded-xl transition hover:bg-purple-700 cursor-pointer"
              >
Déconnexion
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

DashboardNav.propTypes = {
  activeLink: PropTypes.string,
  sidebar: PropTypes.bool,
  setSidebar: PropTypes.func,
};
