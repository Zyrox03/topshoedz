import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../widgets/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../toolkit/productSlice";
const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllOrders = async () => {
      setLoadingOrders(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/orders`);
        const { orders } = response.data;
        setAllOrders(orders);
        console.log(orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingOrders(false);
      }
    };

    getAllOrders();
  }, []);

  const [OrderToViewModal, setOrderToViewModal] = useState(null);

  const [orderToView, setOrderToView] = useState(null);

  const onCloseView = () => {
    setOrderToViewModal(false);
  };
  const openOrder = (order) => {
    setOrderToViewModal(true);
    setOrderToView(order);
  };

  const formatTimestamp = (createdAt) => {
    const date = new Date(createdAt);

    // Extracting components
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Creating the formatted string
    const formattedTime = `${day}/${month}/${year}/ ${hours}:${minutes}`;

    return formattedTime;
  };

  const handleCall = (phoneNumber) => {
    // Use the tel protocol to initiate a phone call
    window.location.href = `tel:${phoneNumber}`;
  };

  const deleteOrder = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(
        `${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/orders/${orderToView._id}`
      );
      const { updatedOrders } = response.data;

      setOrderToViewModal(false);
      setAllOrders(updatedOrders);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 my-4 justify-between flex-wrap">
        <h1 className="text-2xl font-bold mb-4">Aperçu des commandes</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-start border-b">ID de la commande</th>
              <th className="py-2 px-4 text-start border-b">Article </th>
              <th className="py-2 px-4 text-start border-b">Date</th>
              <th className="py-2 px-4 text-start border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loadingOrders ? (
              allOrders.map((order, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{order._id}</td>
                  <td className="py-2 px-4 border-b ">
                    {order.productInfo.name}{" "}
                  </td>
                  <td className="py-2 px-4 border-b ">
                    {" "}
                    {formatTimestamp(order.createdAt)}{" "}
                  </td>
                  <td className="py-2 px-4 border-b ">
                    <button
                      onClick={() => openOrder(order)}
                      className="bg-purple-700 text-white px-2 py-1 rounded ml-2 "
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>LOADING...</>
            )}
          </tbody>
        </table>
      </div>

      {!loadingOrders && (
        <Modal
          isOpen={OrderToViewModal}
          onClose={onCloseView}
          modalTitle={`Détails de la commande `}
        >
          <div className=" mx-auto grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Nom du client:</p>
              <p className="text-lg font-semibold">{orderToView?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Téléphone:</p>
              <p className="text-lg font-semibold">{orderToView?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nom du Produit:</p>
              <p className="text-lg font-semibold">
                {orderToView?.productInfo.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Prix du Produit à l&apos;achat:
              </p>
              <p className="text-lg font-semibold">
                {orderToView?.productInfo.price}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Wilaya:</p>
              <p className="text-lg font-semibold">{orderToView?.wilaya}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Baladiya:</p>
              <p className="text-lg font-semibold">{orderToView?.baladiya}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Taille:</p>
              <p className="text-lg font-semibold">{orderToView?.size}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Quantité:</p>
              <p className="text-lg font-semibold">{orderToView?.quantity}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Couleur:</p>
              <p className="text-lg font-semibold">{orderToView?.color}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Notes:</p>
              <p className="text-lg font-semibold">{orderToView?.notes}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date:</p>
              <p className="text-lg font-semibold">
                {formatTimestamp(orderToView?.createdAt)}
              </p>
            </div>
            {/* Add more grid items as needed */}
          </div>

          <div className="flex items-center gap-3">
            <button
              //   disabled={loading}
              type="button"
              onClick={() => handleCall(orderToView?.phone)}
              className="mt-4 bg-purple-800 flex w-full justify-center items-center gap-2 text-white disabled:bg-purple-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-blue"
            >
              <i className="fa-solid fa-phone"></i>
              <p className="text-lg font-bold">Appeler</p>
            </button>

            <button
              disabled={loading}
              onClick={deleteOrder}
              type="button"
              className="mt-4 bg-red-600 flex w-full justify-center items-center gap-2 text-white disabled:bg-purple-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue"
            >
              <i className="fa-solid fa-trash"></i>
              <p className="text-lg font-bold">Supprimer</p>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;