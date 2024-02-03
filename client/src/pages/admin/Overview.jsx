import axios from "axios";
import { useEffect, useState } from "react";

const Overview = () => {
  // State for order and money data
  const [todayOrders, setTodayOrders] = useState(0);

  const [allOrders, setAllOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);


  useEffect(() => {
    const getAllOrders = async () => {
      setLoadingOrders(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/orders`);
        const { orders } = response.data;
        setAllOrders(orders);


        
        // Filter today's orders
        const today = new Date();
        const todayOrdersCount = orders.filter(order => {
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
