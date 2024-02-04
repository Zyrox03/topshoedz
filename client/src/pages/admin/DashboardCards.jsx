import { Link } from "react-router-dom";
import routes from "../../routes";
import { Helmet } from "react-helmet";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

<Helmet>
        <title>Top Shoe DZ - Espace Admin</title>
        <meta
          name="description"
          content="Espace d'administration réservé aux administrateurs de Top Shoe DZ. Gérez les produits, les commandes et les paramètres du site."
        />

        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta property="og:title" content="Top Shoe DZ - Espace Admin" />
        <meta
          property="og:description"
          content="Espace d'administration réservé aux administrateurs de Top Shoe DZ. Gérez les produits, les commandes et les paramètres du site."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />
        <meta property="og:url" content="https://topshoes-dz.pages.dev/admin" />

        {/* Balises Twitter Card pour le partage sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top Shoe DZ - Espace Admin" />
        <meta
          name="twitter:description"
          content="Espace d'administration réservé aux administrateurs de Top Shoe DZ. Gérez les produits, les commandes et les paramètres du site."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />

        {/* Balises méta supplémentaires */}
        <meta
          name="keywords"
          content="admin, administration, gestion, produits, commandes, site web"
        />
        <meta name="robots" content="noindex, nofollow" />

        {/* Balise meta viewport pour le design responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

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
