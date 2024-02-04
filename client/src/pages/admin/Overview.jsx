import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
const Overview = () => {
  // State for order and money data
  const [todayOrders, setTodayOrders] = useState(0);

  const [allOrders, setAllOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const getAllOrders = async () => {
      setLoadingOrders(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/orders`
        );
        const { orders } = response.data;
        setAllOrders(orders);

        // Filter today's orders
        const today = new Date();
        const todayOrdersCount = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear()
          );
        }).length;

        setTodayOrders(todayOrdersCount);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingOrders(false);
      }
    };

    getAllOrders();
  }, []);

  return (
    <>

<Helmet>
  <title>Top Shoe DZ - Aperçu Administrateur</title>
  <meta name="description" content="Accédez à l'aperçu administrateur de Top Shoe DZ pour gérer l'inventaire, surveiller les ventes et administrer les opérations du magasin." />

  {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
  <meta property="og:title" content="Top Shoe DZ - Aperçu Administrateur" />
  <meta property="og:description" content="Accédez à l'aperçu administrateur de Top Shoe DZ pour gérer l'inventaire, surveiller les ventes et administrer les opérations du magasin." />
  <meta property="og:image" content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg" />
  <meta property="og:url" content="2/overview" />

  {/* Balises Twitter Card pour le partage sur Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Top Shoe DZ - Aperçu Administrateur" />
  <meta name="twitter:description" content="Accédez à l'aperçu administrateur de Top Shoe DZ pour gérer l'inventaire, surveiller les ventes et administrer les opérations du magasin." />
  <meta name="twitter:image" content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg" />

  {/* Balises méta supplémentaires */}
  <meta name="keywords" content="aperçu administrateur, gestion d'inventaire, suivi des ventes, opérations du magasin" />
  <meta name="robots" content="noindex, nofollow" />

  {/* Balise meta viewport pour le design responsive */}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</Helmet>



      {!loadingOrders && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap justify-center lg:justify-start ">
            <div className="w-96  bg-white rounded-xl shadow-md p-4 ">
              <h2 className="text-lg font-semibold">Commandes du jour</h2>
              <p className="text-2xl font-bold">{todayOrders}</p>
            </div>

            <div className="w-96  bg-white rounded-xl shadow-md p-4 ">
              <h2 className="text-lg font-semibold">Total des commandes</h2>
              <p className="text-2xl font-bold">{allOrders.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
