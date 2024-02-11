import Countdown from "react-countdown";
import PropTypes from "prop-types";
export const Timer = ({ deadline }) => {
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="flex gap-6 flex-wrap ">
        {days > 0 && (
          <div className="flex-1 p-4 w-full bg-slate-100/90 rounded-lg flex flex-col items-center justify-center">
            <span className="text-2xl lg:text-4xl font-bold">{days}</span>
            <span className="font-bold">أيام</span>
          </div>
        )}
        <div className="flex-1 p-4 w-full bg-slate-100/90 rounded-lg flex flex-col items-center justify-center">
          <span className="text-2xl lg:text-4xl font-bold">{hours}</span>
          <span className="font-bold">ساعات</span>
        </div>
        <div className="flex-1 p-4 w-full bg-slate-100/90 rounded-lg flex flex-col items-center justify-center">
          <span className="text-2xl lg:text-4xl font-bold">{minutes}</span>
          <span className="font-bold">دقائق</span>
        </div>
        <div className="flex-1 p-4 w-full bg-slate-100/90 rounded-lg flex flex-col items-center justify-center">
          <span className="text-2xl lg:text-4xl font-bold">{seconds}</span>
          <span className="font-bold">ثواني</span>
        </div>
      </div>
    );
  };
  return (
    <div className="flex items-center gap-12 text-purple-700">
      <Countdown date={deadline} renderer={renderer} />,
    </div>
  );
};

Timer.propTypes = {
  deadline: PropTypes.string,
};
