import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../widgets/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../toolkit/productSlice";
import { Helmet } from "react-helmet";
const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const { loading, items: products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllOrders = async () => {
      setLoadingOrders(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/orders`
        );
        const { orders } = response.data;
        setAllOrders(orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingOrders(false);
      }
    };

    getAllOrders();
  }, []);

  const [OrderToViewModal, setOrderToViewModal] = useState(false);

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
      <Helmet>
        <title>Top Shoe DZ - Gestion des Commandes</title>
        <meta
          name="description"
          content="Consultez et gérez les commandes sur le portail administratif de Top Shoe DZ. Suivez les achats, gérez les expéditions et assurez un traitement efficace des commandes clients."
        />

        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta
          property="og:title"
          content="Top Shoe DZ - Gestion des Commandes (Admin)"
        />
        <meta
          property="og:description"
          content="Consultez et gérez les commandes sur le portail administratif de Top Shoe DZ. Suivez les achats, gérez les expéditions et assurez un traitement efficace des commandes clients."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />
        <meta
          property="og:url"
          content="https://topshoes-dz.pages.dev/admin/orders"
        />

        {/* Balises Twitter Card pour le partage sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Top Shoe DZ - Gestion des Commandes (Admin)"
        />
        <meta
          name="twitter:description"
          content="Consultez et gérez les commandes sur le portail administratif de Top Shoe DZ. Suivez les achats, gérez les expéditions et assurez un traitement efficace des commandes clients."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />

        {/* Balises méta supplémentaires */}
        <meta
          name="keywords"
          content="gestion des commandes, suivi des achats, expéditions, traitement des commandes clients"
        />
        <meta name="robots" content="noindex, nofollow" />

        {/* Balise meta viewport pour le design responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="flex items-center gap-4 my-4 justify-between flex-wrap">
        <h1 className="text-2xl font-bold mb-4">Aperçu des commandes</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-start border-b">Article </th>
              <th className="py-2 px-4 text-start border-b">Total</th>
              <th className="py-2 px-4 text-start border-b">Date</th>
              <th className="py-2 px-4 text-start border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
          {!loadingOrders ? (
    allOrders.length > 0 ? (
        allOrders.map((order, index) => {
            const product = products.find(product => product.slug === order?.productInfo?.slug);
            const productImage = product?.images[0]?.image?.path || "https://content.optimumnutrition.com/i/on/C100969_Image_01?layer0=$PDP$";

            return (
                <tr key={index}>
                    <td className="py-2 px-4 text-xs md:text-lg border-b lg:flex lg:items-center lg:gap-3">
                        <img src={productImage} className="w-10 h-10 object-cover" alt="" />
                        {order.productInfo.name}
                    </td>
                    <td className="py-2 px-4 text-xs md:text-lg border-b">
                        {order?.orderTotal} DA
                    </td>
                    <td className="py-2 px-4 text-xs md:text-lg border-b">
                        {formatTimestamp(order.createdAt)}
                    </td>
                    <td className="py-2 px-4 text-xs md:text-lg border-b">
                        <button onClick={() => openOrder(order)} className="bg-purple-700 text-white px-2 py-1 rounded ml-2">
                            <i className="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td className="py-2 px-4 border-b" colSpan="3">
                Aucune commande pour le moment.
            </td>
        </tr>
    )
) : (
    <tr>
        <td className="py-2 px-4 border-b" colSpan="3">
            Chargement...
        </td>
    </tr>
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
              <p className="text-sm text-gray-500 mb-2">ID: {orderToView?._id} </p>
          <div className=" mx-auto grid grid-cols-2 gap-6 ">
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

            {orderToView?.deliveryOption?.livraisonType && (
              <div>
                <p className="text-sm text-gray-600">Type de livraison:</p>
                <p className="text-lg font-semibold">
                  {orderToView?.deliveryOption.livraisonType}
                </p>
              </div>
            )}

            {orderToView?.deliveryOption?.livraisonPrice && (
              <div>
                <p className="text-sm text-gray-600">Prix de livraison:</p>
                <p className="text-lg font-semibold">
                  {orderToView?.deliveryOption.livraisonPrice}
                </p>
              </div>
            )}

            {orderToView?.size && (
              <div>
                <p className="text-sm text-gray-600">Taille:</p>
                <p className="text-lg font-semibold">{orderToView?.size}</p>
              </div>
            )}
           

            <div>
              <p className="text-sm text-gray-600">Quantité:</p>
              <p className="text-lg font-semibold">{orderToView?.quantity}</p>
            </div>

            {orderToView?.color && (
              <div>
                <p className="text-sm text-gray-600">Couleur:</p>
                <p className="text-lg font-semibold">{orderToView?.color}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-600">Notes:</p>
              <p className="text-lg font-semibold">
                {orderToView?.notes || "Aucune note"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Date:</p>
              <p className="text-lg font-semibold">
                {formatTimestamp(orderToView?.createdAt)}
              </p>
            </div>

            {orderToView?.orderTotal && (
              <div>
                <p className="text-sm text-gray-600">Total:</p> 
                <p className="text-lg font-semibold">{orderToView?.orderTotal} DA</p>
              </div>
            )}

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
