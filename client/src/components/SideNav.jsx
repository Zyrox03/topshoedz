import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
export const SideNav = ({ setOpenSideNav, openSideNav, isLanding }) => {
  const { specialOffer } = useSelector((state) => state.products);

  return (
    <div
      style={{ zIndex: 20 }}
      className={`bg-slate-300 flex fixed right-0 w-full h-screen  transition-transform duration-500 bg-opacity-50 backdrop-blur-md ${
        !openSideNav ? "translate-x-full " : "translate-x-0"
      }`}
    >
      <div
        onClick={() => setOpenSideNav(false)}
        className="flex justify-end py-4 px-8 w-full absolute"
      >
        <i className="text-purple-900 text-3xl fas fa-xmark cursor-pointer"></i>
      </div>

      <ul className="flex flex-col items-center w-full gap-6 justify-center">
        {isLanding ? (
          <LinkScroll
            to={"hero"}
            spy={true}
            smooth={true}
            offset={0}
            onClick={() => setOpenSideNav(false)}
          >
            <li className="text-3xl hover:text-purple-500 cursor-pointer font-bold transition">
              الصفحة الرئيسية
            </li>
          </LinkScroll>
        ) : (
          <Link to="/">
            <li className="text-3xl hover:text-purple-500 cursor-pointer font-bold transition">
              الصفحة الرئيسية
            </li>
          </Link>
        )}

        <Link to="/shop">
          <li className="text-3xl hover:text-purple-500 cursor-pointer font-bold transition">
            المتجر
          </li>
        </Link>

        {specialOffer &&
          (isLanding ? (
            <LinkScroll
              to={"feature"}
              spy={true}
              smooth={true}
              offset={-100}
              onClick={() => setOpenSideNav(false)}
            >
              <li className="text-3xl hover:text-purple-500 cursor-pointer font-bold transition">
                عرض خاص
              </li>
            </LinkScroll>
          ) : (
            <Link to="/">
              <li className="text-3xl hover:text-purple-500 cursor-pointer font-bold transition">
                عرض خاص
              </li>
            </Link>
          ))}

        <Link to="/contact">
          <li className="text-3xl hover:text-purple-500 cursor-pointer font-bold transition">
            اتصل بنا
          </li>
        </Link>
      </ul>
    </div>
  );
};
SideNav.propTypes = {
  setOpenSideNav: PropTypes.func.isRequired,
  openSideNav: PropTypes.bool,
  isLanding: PropTypes.bool,
};
