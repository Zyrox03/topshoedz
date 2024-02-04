import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageDropzone from "../../components/Dashboard/ImageDropzone";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "../../widgets/Modal";
import axios from "axios";
import {
  setLoading,
  setSpecialOffer,
  updateProducts,
} from "../../toolkit/productSlice";
import { setNotification } from "../../toolkit/notificationSlice";
import { Helmet } from "react-helmet";

const ProductDetailsAdmin = () => {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, items: productsList } = useSelector(
    (state) => state.products
  );
  const product = productsList.find((product) => product.slug === productID);

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      price: product?.price || "",
      oldPrice: product?.oldPrice || "",
      description: product?.description || "",
      stock: product?.stock || 0,
      size: product?.size || [],
      images: product?.images || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire"),
      slug: Yup.string().matches(
        /^[a-zA-Z0-9-]+$/,
        "Format de l'identifiant invalide"
      ),
      price: Yup.number().required("Le prix est obligatoire"),
      oldPrice: Yup.number().required("L'ancien prix est obligatoire"),
      description: Yup.string().required("La description est obligatoire"),
      stock: Yup.number().required("Le stock est obligatoire"),
    }),

    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        const formData = new FormData();
        // Append other form fields to the FormData
        Object.keys(values).forEach((key) => {
          if (key === "images") {
            // Convert the array of objects to a JSON string and append it
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === "size" && Array.isArray(values[key])) {
            if (values[key].length > 0) {
              // If 'size' is a non-empty array, append each element individually
              values[key].forEach((size) => {
                formData.append(key, size);
              });
            } else {
              // If 'size' is an empty array, append an empty array
              formData.append(key, []);
            }
          } else {
            formData.append(key, values[key]);
          }
        });

        // Append each image file to the FormData
        values.images.forEach((image) => {
          formData.append("imageFiles", image.imageFile);
        });

        if (productID === "new") {
          const response = await axios.post(
            `${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/products`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { updatedProducts, message } = response.data;
          dispatch(updateProducts(updatedProducts));
          dispatch(setNotification({ message, type: "success" }));

          navigate("/admin/products");
        } else {
          const response = await axios.put(
            `${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/products/${
              product.slug
            }`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { updatedProducts, message } = response.data;

          dispatch(updateProducts(updatedProducts));
          dispatch(setNotification({ message, type: "success" }));

          navigate("/admin/products");
        }
      } catch (error) {
        console.log(error);
        dispatch(
          setNotification({
            message: error.response.data.message || error.message,
            type: "error",
          })
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  let deduction = 0;

  if (product) {
    deduction = Math.floor(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  }

  const [uploadedstock, setUploadedstock] = useState([]);

  const [imageToAddObject, setImageToAddObject] = useState({
    image: "",
    productColor: "",
    imageFile: "",
  });

  const onDrop = (acceptedFiles) => {
    // Ensure that only the first file is considered
    const droppedFile = acceptedFiles[0];

    if (droppedFile) {
      const imagePreview = URL.createObjectURL(droppedFile);

      // Update state to store the dropped image information
      setUploadedstock([URL.createObjectURL(droppedFile)]);

      setImageToAddObject((prevState) => ({
        ...prevState,
        // Add information about the dropped image, for example, the file object
        image: { path: imagePreview },
        imageFile: droppedFile,
      }));
    }
  };

  const [sizeInputText, setSizeInputText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && sizeInputText.trim() !== "") {
      // Add the size to the formik.values.size array
      e.preventDefault();

      formik.setValues({
        ...formik.values,
        size: [...formik.values.size, sizeInputText.trim()],
      });
      // Clear the input field
      setSizeInputText("");
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    setSizeInputText(inputValue);
  };

  const deleteSize = (size) => {
    if (!loading) {
      formik.setFieldValue(
        "size",
        formik.values.size.filter((formikSize) => formikSize !== size)
      );
    }
  };

  // IMAGE MANAGEMENT

  const uploadImage = () => {
    formik.setValues({
      ...formik.values,
      images: [...formik.values.images, imageToAddObject],
    });

    // Clear the input field
    setImageToAddObject({ image: "", productColor: "", imageFile: "" });

    setAddImageModal(false);
  };

  const handleProductColorChange = (e) => {
    const inputValue = e.target.value;

    // Spread the existing state and update the productColor property
    setImageToAddObject((prevState) => ({
      ...prevState,
      productColor: inputValue,
    }));
  };

  const deleteImage = (image) => {
    formik.setFieldValue(
      "images",
      formik.values.images.filter(
        (formikImage) => formikImage.image.path !== image
      )
    );
  };

  const [addImageModal, setAddImageModal] = useState(false);

  const closeAddImageModal = () => {
    setAddImageModal(false);
  };

  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");

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
      navigate("/admin/products");
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
    <div className="bg-white p-4 rounded-md shadow-md">
      <Helmet>
        <title>
          {product ? ` Modifer ${product.name}` : "Ajouter un Produit"}{" "}
        </title>
        <meta
          name="description"
          content="Ajoutez ou mettez à jour des produits sur le portail administratif de Top Shoe DZ. Gérez les détails, les images et assurez-vous que votre inventaire est toujours à jour."
        />

        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta
          property="og:title"
          content="Top Shoe DZ - Gestion des Produits (Admin)"
        />
        <meta
          property="og:description"
          content="Ajoutez ou mettez à jour des produits sur le portail administratif de Top Shoe DZ. Gérez les détails, les images et assurez-vous que votre inventaire est toujours à jour."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />
        <meta
          property="og:url"
          content={`${
            product
              ? `https://topshoes-dz.pages.dev/admin/products/${product?.slug}`
              : "https://topshoes-dz.pages.dev/admin/products/new"
          }`}
        />

        {/* Balises Twitter Card pour le partage sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Top Shoe DZ - Gestion des Produits (Admin)"
        />
        <meta
          name="twitter:description"
          content="Ajoutez ou mettez à jour des produits sur le portail administratif de Top Shoe DZ. Gérez les détails, les images et assurez-vous que votre inventaire est toujours à jour."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />

        {/* Balises méta supplémentaires */}
        <meta
          name="keywords"
          content="gestion des produits, ajout de produits, mise à jour de produits, détails des produits, images des produits"
        />
        <meta name="robots" content="noindex, nofollow" />

        {/* Balise meta viewport pour le design responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">
        {" "}
        {product ? ` Modifer ${product.name}` : "Ajouter un Produit"}{" "}
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-12"
        encType="multipart/form-data"
      >
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-600"
              >
                Nom du Produit
              </label>
              <input
                dir="rtl"
                disabled={loading}
                type="text"
                id="name"
                name="name"
                placeholder="Entrez votre nom"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-semibold text-gray-600"
              >
                Identifiant du Produit
              </label>
              <input
                dir="rtl"
                disabled={loading}
                type="text"
                placeholder="Entrez l'dentifiant du produit"
                id="slug"
                value={formik.values.slug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  formik.touched.slug && formik.errors.slug
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              {formik.touched.slug && formik.errors.slug && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.slug}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-600"
              >
                Prix
              </label>
              <input
                dir="rtl"
                disabled={loading}
                type="number"
                id="price"
                name="price"
                placeholder="Entrez le prix du produit"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  formik.touched.price && formik.errors.price
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.price}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="oldPrice"
                className="block text-sm font-semibold text-gray-600"
              >
                Ancien Prix
              </label>
              <input
                dir="rtl"
                disabled={loading}
                type="number"
                id="oldPrice"
                placeholder="Entrez l'ancien prix du produit"
                name="oldPrice"
                value={formik.values.oldPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  formik.touched.oldPrice && formik.errors.oldPrice
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              {formik.touched.oldPrice && formik.errors.oldPrice && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.oldPrice}
                </div>
              )}
            </div>

            {deduction > 0 && (
              <div className="mb-4 bg-slate-100 p-2 border border-purple-500">
                <span className=" ">
                  Le client aura{" "}
                  <span className="font-bold text-purple-500">
                    {deduction}%{" "}
                  </span>
                  de déduction sur ce produit à l&apos;achat
                </span>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-600 "
              >
                Description
              </label>
              <textarea
                dir="rtl"
                disabled={loading}
                id="description"
                name="description"
                value={formik.values.description}
                placeholder="Entrez la description du produit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 h-60 border rounded-md focus:outline-none ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block text-sm font-semibold text-gray-600"
              >
                Stock
              </label>
              <input
                dir="rtl"
                disabled={loading}
                type="number"
                id="stock"
                name="stock"
                placeholder="Entrez le stock du produit"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  formik.touched.stock && formik.errors.stock
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              {formik.touched.stock && formik.errors.stock && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.stock}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            {/* SIZE & COLOR VARIANTS */}

            {/* UPLOAD IMAGES  */}

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                Images du Produit{" "}
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                {formik.values.images.length > 0 &&
                  formik.values.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => deleteImage(image.image.path)}
                      className="w-[45%] h-40 bg-purple-500 text-white hover:bg-red-500 transition cursor-pointer shadow-lg flex justify-center items-center rounded-xl p-2"
                    >
                      <img
                        src={image.image.path || image.path}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  ))}

                <div
                  onClick={() => setAddImageModal(true)}
                  className="w-[45%] h-40 bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer shadow-lg flex justify-center items-center rounded-xl p-2"
                >
                  <i className="fas fa-plus"></i>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-sm font-semibold text-gray-600"
              >
                Taille
              </label>
              <input
                dir="rtl"
                disabled={loading}
                type="text"
                id="size"
                name="size"
                onKeyDown={handleKeyDown}
                placeholder="Ajouter une pointure au produit"
                value={sizeInputText}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  formik.touched.size && formik.errors.size
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              {formik.touched.size && formik.errors.size && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.size}
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                {formik.values.size.map((size) => (
                  <span
                    key={size}
                    className="p-2 bg-purple-500 text-white rounded-xl transition shadow-lg hover:bg-red-500 cursor-pointer"
                    onClick={() => deleteSize(size)}
                  >
                    {" "}
                    {size}{" "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={addImageModal}
          onClose={closeAddImageModal}
          modalTitle={`Ajoutez une image  ${
            !product?.name ? "" : "pour" + " " + product.name
          }`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              <div className="flex-1">
                <ImageDropzone
                  loading={loading}
                  onDrop={onDrop}
                  uploadedImages={uploadedstock}
                />
              </div>
              <div className="flex-1">
                {/*  Color Variant */}

                <div className="mb-4">
                  <label
                    htmlFor="productColor"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Couleur
                  </label>
                  <input
                    dir="rtl"
                    disabled={loading}
                    type="text"
                    id="productColor"
                    placeholder="Ajouter une couleur à ce produit"
                    value={imageToAddObject.productColor}
                    onChange={handleProductColorChange}
                    name="productColor"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500`}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={uploadImage}
              className="bg-blue-500 text-white disabled:bg-blue-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Ajouter
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={deleteProductModal}
          onClose={onCloseDelete}
          modalTitle={`Supprimer ${product?.name}  ?`}
        >
          <div className="mt-2">
            <p className="text-sm text-gray-800">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              disabled={loading}
              onClick={() => deleteProduct(productToDelete)}
              type="button"
              id="confirmDeleteButton"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-red-400"
            >
              Delete
            </button>
            <button
              disabled={loading}
              onClick={onCloseDelete}
              type="button"
              id="cancelDeleteButton"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </Modal>

        <div className="flex w-full gap-2 items-center justify-around">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 flex w-96 justify-center items-center gap-2  text-white disabled:bg-blue-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            <span> Enregistrer </span>
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
          {productID !== "new" && (
            <>
              <Link to={`/${product.slug}`}>
                <button
                  type="button"
                  disabled={loading}
                  className="bg-purple-500 flex lg:w-96 justify-center items-center gap-2 text-white disabled:bg-purple-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-blue"
                >
                  <span className="hidden lg:flex"> Voir le produit </span>
                  <i className="fa-solid fa-eye"></i>
                </button>
              </Link>

              <button
                type="button"
                disabled={loading}
                onClick={() => openDelete(product.slug)}
                className="bg-red-500 text-white flex lg:w-96 justify-center items-center gap-2 disabled:bg-red-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
              >
                <span className="hidden lg:flex">Supprimer</span>{" "}
                <i className="fa-solid fa-trash"></i>
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductDetailsAdmin;
