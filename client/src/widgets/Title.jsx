import PropTypes from "prop-types";

export const Title = ({ title, sub_title }) => {
  return (
    <div className="flex flex-col gap-3 items-center text-center">
      <h1 className="text-4xl font-bold text-purple-800">{title}</h1>
      <p className="text-xl">{sub_title} </p>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  sub_title: PropTypes.string,
};
