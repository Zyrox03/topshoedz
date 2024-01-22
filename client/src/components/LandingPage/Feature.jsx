import { Button } from "../../widgets/Button";
import { Timer } from "../../widgets/Timer";
export const Feature = () => {
 

  return (
    <div className="flex flex-col items-center  justify-center" id="feature">
      <div className="bg-purple-400/50 rounded-2xl w-[80%] min-h-[400px] flex flex-col-reverse lg:flex-row items-center p-4 gap-4 relative overflow-hidden">
        <img
          className="absolute h-full object-cover w-full z-0 opacity-[0.5]"
          src="https://static.vecteezy.com/system/resources/thumbnails/011/577/787/small/3d-rendered-colorful-confetti-with-fun-color-png.png"
          alt=""
        />
        <div className="flex-1 h-full z-10">
          <img
            src="https://i.ebayimg.com/00/s/NTM3WDk3Mg==/z/b6QAAOSwetljWAFx/$_58.png"
            alt="special offer"
            className="h-full object-contain w-full rounded-lg"
          />
        </div>
        <div className="flex-1 flex flex-col gap-6 justify-around z-10">
          <h2 className="text-xl font-bold text-purple-800">Offre Special</h2>
          <span className="text-5xl font-bold ">20% OFF</span>
          <p>
          Explorez les derniers styles avec notre collection Air Force Montante. Élevez votre jeu de mode avec ces baskets montantes qui allient parfaitement confort et style.

          </p>

          <Timer />

          <Button text="Voir" icon="fa-solid fa-tag" />
        </div>
      </div>
    </div>
  );
};
