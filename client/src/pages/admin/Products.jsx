import { Link } from "react-router-dom";
import { Modal } from "../../widgets/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setLoading,
  setSpecialOffer,
  updateProducts,
} from "../../toolkit/productSlice";
import { setNotification } from "../../toolkit/notificationSlice";
import { Helmet } from "react-helmet";

const Products = () => {
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");

  const dispatch = useDispatch();
  const {
    loading,
    items: productsList,
    specialOffer,
  } = useSelector((state) => state.products);
  const onCloseDelete = () => {
    setDeleteProductModal(false);
  };
  const openDelete = (slug) => {
    setDeleteProductModal(true);
    setProductToDelete(slug);
  };

  const deleteProduct = async (productToDelete) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.delete(
        `${
          import.meta.env.VITE_TOP_SHOE_DZ_BASE_API
        }/products/${productToDelete}`
      );

      // Assuming the server responds with the updated list of products after deletion
      const { updatedProducts, message, specialOffer } = response.data;

      // You can handle the updated products data as needed (e.g., update the Redux state)

      dispatch(setSpecialOffer(specialOffer));
      dispatch(updateProducts(updatedProducts));
      dispatch(setNotification({ message, type: "success" }));

      onCloseDelete();
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.message || error.message,
          type: "error",
        })
      );
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Top Shoe DZ - Gestion des Produits</title>
        <meta
          name="description"
          content="Gérez efficacement les produits sur le portail administratif de Top Shoe DZ. Ajoutez, modifiez ou supprimez des produits pour maintenir un inventaire à jour."
        />

        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta
          property="og:title"
          content="Top Shoe DZ - Gestion des Produits"
        />
        <meta
          property="og:description"
          content="Gérez efficacement les produits sur le portail administratif de Top Shoe DZ. Ajoutez, modifiez ou supprimez des produits pour maintenir un inventaire à jour."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />
        <meta
          property="og:url"
          content="https://topshoes-dz.pages.dev/admin/products"
        />

        {/* Balises Twitter Card pour le partage sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Top Shoe DZ - Gestion des Produits"
        />
        <meta
          name="twitter:description"
          content="Gérez efficacement les produits sur le portail administratif de Top Shoe DZ. Ajoutez, modifiez ou supprimez des produits pour maintenir un inventaire à jour."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />

        {/* Balises méta supplémentaires */}
        <meta
          name="keywords"
          content="gestion des produits, contrôle des stocks, ajouter des produits, modifier des produits, supprimer des produits"
        />
        <meta name="robots" content="noindex, nofollow" />

        {/* Balise meta viewport pour le design responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="flex items-center gap-4 my-4 justify-between flex-wrap">
        <h1 className="text-2xl font-bold mb-4">Gestion des produits</h1>
        <Link to="/admin/products/new">
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 bg-purple-800 text-white rounded-lg py-2 px-4 hover:bg-purple-900 transition disabled:scale-100 disabled:bg-purple-400 active:scale-95"
          >
            <i className="text-lg fa-solid fa-plus"></i>
            <p className="text-lg font-bold">Ajouter un Produit</p>
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-start border-b">Nom du Produit</th>
              <th className="py-2 px-4 text-start border-b">Prix </th>
              <th className="py-2 px-4 text-start border-b">Stock</th>
              <th className="py-2 px-4 text-start border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(({ name, slug, price, images, stock }, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b lg:flex lg:items-center lg:gap-3">
                  <img
                    src={
                      images[0]?.image?.path ||
                      "https://content.optimumnutrition.com/i/on/C100969_Image_01?layer0=$PDP$"
                    }
                    className="w-10 h-10 object-cover"
                    alt=""
                  />
                  {name}{" "}
                </td>
                <td className="py-2 px-4 border-b">{price} DA </td>
                <td className="py-2 px-4 border-b">{stock} </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex gap-1 lg:gap-2">
                    <Link to={`/admin/products/${slug}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded ">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => openDelete(slug)}
                      className="bg-red-500 text-white px-2 py-1 rounded "
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <Link to={`/${slug}`}>
                      <button
                        onClick={() => openDelete(slug)}
                        className="bg-purple-600 text-white px-2 py-1 rounded "
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </Link>
                    {specialOffer?.slug === slug && (
                      <Link to={`/admin/special-offer`}>
                        <button className="bg-pink-500 text-white px-2 py-1 rounded ">
                          <i className="fa-solid fa-star"></i>
                        </button>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={deleteProductModal}
        onClose={onCloseDelete}
        modalTitle={`Supprimer ${
          productsList.find((product) => product.slug === productToDelete)?.name
        }  ?`}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-800">
            Êtes-vous sûr(e) de vouloir supprimer ce produit ? Cette action ne
            peut pas être annulée.
          </p>
        </div>

        <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            disabled={loading}
            onClick={() => deleteProduct(productToDelete)}
            type="button"
            id="confirmDeleteButton"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-red-400"
          >
            Supprimer
          </button>
          <button
            disabled={loading}
            onClick={onCloseDelete}
            type="button"
            id="cancelDeleteButton"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
