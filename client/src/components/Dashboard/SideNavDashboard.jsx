import { Link } from "react-router-dom";
import routes from "../../routes";

import PropTypes from "prop-types";

const SideNavDashboard = ({
  setSidebar,
  activeLink,
  sidebar,
  setActiveLink,
}) => {
  return (
    <aside
      className={`${
        sidebar
          ? "-translate-x-[0%]"
          : "-translate-x-[150%] lg:-translate-x-[0%]"
      }  fixed h-screen p-4 transition duration-500 lg:block w-[60%] md:max-w-96 lg:w-[20%]`}
      style={{ zIndex: 2 }}
    >
      <div
        style={{ backgroundColor: "#1C2434" }}
        className=" h-full rounded-xl text-white flex flex-col p-2"
      >
        <Link to="/admin">
          <div
            onClick={() => {
              setActiveLink("Welcome Admin !"), setSidebar(false);
            }}
            className="p-4"
          >
            <h1 className="text-2xl font-semibold">Top Shoe DZ</h1>
          </div>
        </Link>
        <nav className="flex-1 flex flex-col gap-1 mt-6">
          <h3 className="text-sm text-slate-100 font-bold m-2">Management</h3>
          {routes.map(({ path, title, icon }, index) => (
            !path.includes("products/:productID") && (

            <Link
              key={index}
              to={path}
              onClick={() => {
                setActiveLink(title), setSidebar(false);
              }}
              className={`${
                activeLink === title ? "bg-purple-800" : ""
              } flex w-full items-center justify-start gap-12 text-white rounded-lg py-2 px-4 active:scale-95 block py-2  text-white transition hover:bg-purple-700`}
            >
              {icon}
              <p className="text-lg font-bold text-start">{title} </p>
            </Link>
            )

          ))}

          <h3 className="text-sm text-slate-100 font-bold m-2">Account</h3>

          <div
            className={` flex w-full items-center justify-start gap-12 text-white rounded-lg py-2 px-4 active:scale-95 block py-2  text-white transition hover:bg-purple-700`}
          >
            <i className="fa-solid fa-user"></i>
            <p className="text-lg font-bold text-start">Logout </p>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideNavDashboard;

SideNavDashboard.propTypes = {
  activeLink: PropTypes.string,
  sidebar: PropTypes.bool,
  setSidebar: PropTypes.func,
  setActiveLink: PropTypes.func,
};
