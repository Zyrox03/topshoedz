import { Button } from "../../widgets/Button";
import { HeroSwiper } from "../../widgets/HeroSwiper";
import { Link as LinkScroll } from "react-scroll";
export const Hero = () => {
  return (
    <div className="h-[90vh] flex items-center justify-start relative" id="hero">
      <HeroSwiper />
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background: "linear-gradient(to left, transparent, rgba(0,0,0,0.75))",
          zIndex: 10,
        }}
      ></div>
      <div className="p-4 flex flex-col items-start max-w-3xl text-start justify-center gap-12 relative z-10">
        <h1 className="text-5xl font-bold text-purple-100">
          {" "}
          Découvrez votre paire parfaite
        </h1>
        <p className="text-md lg:text-xl text-white w-5/6">
        Améliorez votre jeu de chaussures avec notre collection organisée de chaussures tendance et confortables. Des chaussures décontractées aux talons élégants, nous avons la coupe parfaite pour chaque occasion. Découvrez nos derniers arrivages et sortez en toute confiance avec Top Shoe DZ.

        </p>
        <LinkScroll
            to={"best-selling"}
            spy={true}
            smooth={true}
            offset={-80}
          >
          
        <Button text="Voir" icon="fa-solid fa-arrow-down" />
          </LinkScroll>
      </div>
    </div>
  );
};
