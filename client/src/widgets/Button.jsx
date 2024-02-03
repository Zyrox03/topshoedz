import PropTypes from "prop-types";
export const Button = ({ text, icon }) => {
  return (
    <button className="bookmarkBtn w-[110px] bg-slate-300 ">
      <span className="IconContainer text-black ">
        <i className={icon}></i>
      </span>
      <p className="text font-bold">{text}</p>
    </button>
  );
};
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};
