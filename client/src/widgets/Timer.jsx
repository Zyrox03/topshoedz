import Countdown from "react-countdown";

export const Timer = () => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="flex gap-6 flex-wrap">
        {days > 0 && (
          <div className="w-[80px] h-[80px] bg-slate-100 rounded-lg flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{days}</span>
            <span className="font-bold">Jours</span>
          </div>
        )}
        <div className="w-[80px] h-[80px] bg-slate-100 rounded-lg flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{hours}</span>
          <span className="font-bold">Heures</span>
        </div>
        <div className="w-[80px] h-[80px] bg-slate-100 rounded-lg flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{minutes}</span>
          <span className="font-bold">Minutes</span>
        </div>
        <div className="w-[80px] h-[80px] bg-slate-100 rounded-lg flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{seconds}</span>
          <span className="font-bold">Secondes</span>
        </div>
      </div>
    );
  };
  return (
    <div className="flex items-center gap-12 text-purple-700">
      <Countdown date="2024-01-26T01:02:03" renderer={renderer} />,
    </div>
  );
};
