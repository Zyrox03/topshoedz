import { Link } from "react-router-dom";
import routes from "../../routes";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {routes.map(
        ({ path, title, icon }, index) =>
          !path.includes("products/:productID") && (
            <Link
              key={index}
              to={path}
              className="p-4 bg-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              {icon}
              <h2 className=" text-xl font-bold mt-2">{title}</h2>
            </Link>
          )
      )}

      <Link
        to="/"
        className="p-4 bg-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        <i className="fa-solid fa-home"></i>
        <h2 className=" text-xl font-bold mt-2">Magasin</h2>
      </Link>
    </div>
  );
};

export default DashboardCards;
