import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";
import { setNotification } from "../../toolkit/notificationSlice";
import { setSpecialOffer } from "../../toolkit/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const SpecialOffer = () => {
  const {
    loading,
    items: products,
    specialOffer,
  } = useSelector((state) => state.products);
  const [specialProduct, setSpecialProduct] = useState(
    products.find((product) => product.slug === specialOffer?.slug || null)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      productID: specialOffer?._id || null,
      name: specialOffer?.name || "",
      slug: specialOffer?.slug || "",
      deadline: new Date(),
      specialDescription: specialOffer?.specialDescription || "",
    },
    onSubmit: async (values) => {
      try {
        // Use Axios to set up the special offer
        const response = await axios.post(
          `${
            import.meta.env.VITE_TOP_SHOE_DZ_BASE_API
          }/products/setup-special-offer/${specialProduct?.slug}`,
          {
            deadline: format(values.deadline, "yyyy-MM-dd'T'HH:mm:ss"),
            specialDescription: values.specialDescription,
            deleteSpecialOffer: specialProduct?.slug,
          }
        );

        const { specialOffer, message } = response.data;
        dispatch(setSpecialOffer(specialOffer));
        dispatch(setNotification({ message, type: "success" }));

        navigate("/admin/products");
      } catch (error) {
        console.error("Error setting up special offer:", error);
        dispatch(
          setNotification({
            message: error?.response?.data?.message || "Error !",
            type: "error",
          })
        );
      }
    },
  });

  const openSpecial = (product) => {
    if (specialProduct?._id === product._id) {
      setSpecialProduct(null);
      formik.setFieldValue("productID", null);
    } else {
      setSpecialProduct(product);
      formik.setFieldValue("productID", product._id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-4">
      <Helmet>
        <title>Top Shoe DZ - Configuration des Offres Spéciales</title>
        <meta
          name="description"
          content="Configurez les offres spéciales sur le portail administratif de Top Shoe DZ. Gérez les réductions et les promotions pour offrir des avantages exclusifs aux clients."
        />

        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta
          property="og:title"
          content="Top Shoe DZ - Configuration des Offres Spéciales (Admin)"
        />
        <meta
          property="og:description"
          content="Configurez les offres spéciales sur le portail administratif de Top Shoe DZ. Gérez les réductions et les promotions pour offrir des avantages exclusifs aux clients."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />
        <meta
          property="og:url"
          content="https://topshoes-dz.pages.dev/admin/special-offer"
        />

        {/* Balises Twitter Card pour le partage sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Top Shoe DZ - Configuration des Offres Spéciales (Admin)"
        />
        <meta
          name="twitter:description"
          content="Configurez les offres spéciales sur le portail administratif de Top Shoe DZ. Gérez les réductions et les promotions pour offrir des avantages exclusifs aux clients."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />

        {/* Balises méta supplémentaires */}
        <meta
          name="keywords"
          content="configuration des offres spéciales, réductions, promotions, avantages clients"
        />
        <meta name="robots" content="noindex, nofollow" />

        {/* Balise meta viewport pour le design responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="flex gap-4 flex-wrap justify-around">
        {products &&
          products.length > 0 &&
          products.map((product, index) => (
            <div
              key={index}
              className={`w-40 rounded-xl p-2 hover:bg-purple-500 cursor-pointer transition flex flex-col gap-2 ${
                specialProduct?._id === product._id
                  ? "text-white bg-purple-700"
                  : "text-black bg-slate-200"
              }`}
              onClick={() => openSpecial(product)}
            >
              <img
                src={
                  product.images[0]?.image?.path ||
                  "https://content.optimumnutrition.com/i/on/C100969_Image_01?layer0=$PDP$"
                }
                className="w-full h-40 object-cover"
                alt=""
              />
              <p>{product.name}</p>
            </div>
          ))}
      </div>
      <div>
        {products && products.length > 0 ? (
          <form onSubmit={formik.handleSubmit}>
            {specialProduct && (
              <>
                <div>
                  <h2 className="text-lg">
                    Créer une promotion exclusive pour{" "}
                    <span className="font-bold">{specialProduct.name}</span>
                  </h2>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date limite
                  </label>
                  <DatePicker
                    selected={formik.values.deadline}
                    onChange={(date) => {
                      formik.setFieldValue("deadline", date), console.log(date);
                    }}
                    placeholderText="Select a deadline"
                    // dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="specialDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description spéciale
                  </label>
                  <textarea
                    dir="rtl"
                    type="text"
                    id="specialDescription"
                    name="specialDescription"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.specialDescription}
                    className="mt-1 p-2 border border-gray-300 h-40 rounded-md w-full"
                  />
                  {formik.touched.specialDescription &&
                    formik.errors.specialDescription && (
                      <div className="text-red-500">
                        {formik.errors.specialDescription}
                      </div>
                    )}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-blue-500 flex w-96 justify-center items-center gap-2  text-white disabled:bg-blue-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              <span> Enregistrer </span>
              <i className="fa-solid fa-floppy-disk"></i>
            </button>
          </form>
        ) : (
          <div className="flex justify-between items-center flex-row-reverse gap-4">
            <h3>لا يمكن أن يكون المتجر فارغًا قبل إضافة منتج خاص</h3>
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
        )}
      </div>
    </div>
  );
};

export default SpecialOffer;
