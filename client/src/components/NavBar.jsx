import { useEffect, useState } from "react";
import { Button } from "../widgets/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { useSelector } from "react-redux";

export const NavBar = ({ setOpenSideNav, isLanding }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // You can adjust the scroll threshold based on your design
      const scrollThreshold = 50;

      // Check if the scroll position is greater than the threshold
      setIsScrolled(scrollPosition > scrollThreshold);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  const isAdmin = useSelector((state) => state.auth.admin);

  const { specialOffer } = useSelector((state) => state.products);

  return (
    <nav
      style={{
        zIndex: 20,
      }}
      className={`h-[5em] flex justify-between items-center gap-2 px-2 ${
        isLanding
          ? isScrolled
            ? "py-3 bg-slate-300 bg-opacity-50 backdrop-blur-md shadow-md"
            : "py-6 text-slate-100 "
          : "py-3 bg-slate-300 bg-opacity-50 backdrop-blur-md shadow-md"
      } fixed w-full transition`}
    >
      {isAdmin ? (
        <Link className="lg:hidden flex-1 text-black" to="/admin">
          <Button text="Admin" icon="fa-solid fa-user-tie" />
        </Link>
      ) : (
        <Link className="lg:hidden flex-1 text-black" to="/account">
          <Button text="حسابي" icon="fa-solid fa-user" />
        </Link>
      )}

      <div className="lg:flex-1 text-center lg:text-start">
        {isLanding ? (
          <LinkScroll to={"hero"} spy={true} smooth={true} offset={0}>
            <h1
              className={`text-lg sm:text-2xl font-bold uppercase  transition  cursor-pointer ${
                isScrolled ? "text-slate-800" : "text-purple-700"
              } `}
            >
              Top Shoe DZ
            </h1>
          </LinkScroll>
        ) : (
          <Link to="/">
            <h1
              className={`text-sm sm:text-2xl font-bold uppercase  transition  cursor-pointer ${
                isScrolled ? "text-slate-800" : "text-purple-700"
              } `}
            >
              Top Shoe DZ
            </h1>
          </Link>
        )}
      </div>
      <ul className="hidden lg:flex items-center flex-row-reverse justify-around flex-1">
        {isLanding ? (
          <LinkScroll to={"hero"} spy={true} smooth={true} offset={0}>
            <li className="hover:text-purple-500 cursor-pointer font-bold transition">
              الصفحة الرئيسية
            </li>
          </LinkScroll>
        ) : (
          <Link to="/">
            <li className="hover:text-purple-500 cursor-pointer font-bold transition">
              الصفحة الرئيسية
            </li>
          </Link>
        )}

        <Link to="/shop">
          <li className="hover:text-purple-500 cursor-pointer font-bold transition">
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
              <li className="hover:text-purple-500 cursor-pointer font-bold transition">
                عرض خاص
              </li>
            </LinkScroll>
          ) : (
            <Link to="/">
              <li className="hover:text-purple-500 cursor-pointer font-bold transition">
                عرض خاص
              </li>
            </Link>
          ))}

        <Link to="/contact">
          <li className="hover:text-purple-500 cursor-pointer font-bold transition">
            اتصل بنا
          </li>
        </Link>
      </ul>

      <div className="flex items-center  flex-1">
        {/* <i className="text-xl fa-solid fa-cart-shopping ml-auto"></i> */}
        <div className="ml-auto flex gap-2 text-black">
          {isAdmin ? (
            <Link className="hidden lg:flex" to="/admin">
              <Button text="Admin" icon="fa-solid fa-user-tie" />
            </Link>
          ) : (
            <Link className="hidden lg:flex" to="/account">
              <Button text="حسابي" icon="fa-solid fa-user" />
            </Link>
          )}

          <div onClick={() => setOpenSideNav(true)} className="flex lg:hidden">
            <Button text="قائمة" icon="fa-solid fa-bars" />
          </div>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  setOpenSideNav: PropTypes.func.isRequired,
  isLanding: PropTypes.bool,
};
