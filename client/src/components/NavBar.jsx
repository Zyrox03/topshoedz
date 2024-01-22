import { useEffect, useState } from "react";
import { Button } from "../widgets/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";

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
      <div className="flex-1">

        
      {isLanding ? (

<LinkScroll
  to={"hero"}
  spy={true}
  smooth={true}
  offset={0}
>
<h1
    className={`text-sm sm:text-2xl font-bold uppercase  transition cursor-pointer ${
      isScrolled ? "text-slate-800" : "text-purple-700"
    } `}
  >
    Top Shoe DZ
  </h1>
</LinkScroll>
) : (

  <Link to="/">
  <h1
    className={`text-sm sm:text-2xl font-bold uppercase  transition ${
      isScrolled ? "text-slate-800" : "text-purple-700"
    } `}
  >
    Top Shoe DZ
  </h1>
</Link>
)}


      </div>
      <ul className="hidden lg:flex items-center justify-around flex-1">

      {isLanding ? (

          <LinkScroll
            to={"hero"}
            spy={true}
            smooth={true}
            offset={0}
          >
            <li className="hover:text-purple-500 cursor-pointer font-bold transition">
            Accueil
            </li>
          </LinkScroll>
        ) : (
        <Link to="/">
          <li className="hover:text-purple-500 cursor-pointer font-bold transition">
          Accueil
          </li>
        </Link>
        )}

        

        <Link to="/shop">
          <li className="hover:text-purple-500 cursor-pointer font-bold transition">
            Boutique
          </li>
        </Link>

        {isLanding ? (
          <LinkScroll
            to={"feature"}
            spy={true}
            smooth={true}
            offset={-100}
            onClick={() => setOpenSideNav(false)}
          >
            <li className="hover:text-purple-500 cursor-pointer font-bold transition">
              En vedette
            </li>
          </LinkScroll>
        ) : (
          <Link to="/">
            <li className="hover:text-purple-500 cursor-pointer font-bold transition">
              En vedette
            </li>
          </Link>
        )}

        <Link to="/contact">
          <li className="hover:text-purple-500 cursor-pointer font-bold transition">
            Contact
          </li>
        </Link>
      </ul>

      <div className="flex items-center  flex-1">
        {/* <i className="text-xl fa-solid fa-cart-shopping ml-auto"></i> */}
        <div className="ml-auto flex gap-2 text-black">
          <Link to="/cart">
            <Button text="Panier" icon="fa-solid fa-cart-shopping" />
          </Link>
          <div onClick={() => setOpenSideNav(true)} className="flex lg:hidden">
            <Button text="Menu" icon="fa-solid fa-bars" />
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
