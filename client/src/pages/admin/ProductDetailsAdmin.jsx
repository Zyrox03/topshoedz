import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageDropzone from "../../components/Dashboard/ImageDropzone";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "../../widgets/Modal";

const ProductDetailsAdmin = () => {
  const { productID } = useParams();
  const productsList = useSelector((state) => state.products.items);
  const product = productsList.find((product) => product.name === productID);

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
      name: Yup.string().required("Required"),
      slug: Yup.string(),
      price: Yup.number().required("Required"),
      oldPrice: Yup.number().required("Required"),
      description: Yup.string().required("Required"),
      stock: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      // Replace this with your logic to save the edited product details
      console.log("Product details saved:", values);
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
    imageFile:""
  });


  const onDrop = (acceptedFiles) => {
    // Ensure that only the first file is considered
    const droppedFile = acceptedFiles[0];

    console.log(droppedFile)
    if (droppedFile) {

      const imagePreview = URL.createObjectURL(droppedFile);


      // Update state to store the dropped image information
      setUploadedstock([URL.createObjectURL(droppedFile)]);

      setImageToAddObject((prevState) => ({
        ...prevState,
        // Add information about the dropped image, for example, the file object
        image: imagePreview,
      imageFile: droppedFile,
      }));
    }
  };

  const [sizeInputText, setSizeInputText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && sizeInputText.trim() !== "") {
      // Add the size to the formik.values.size array
      e.preventDefault()

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
    formik.setFieldValue(
      "size",
      formik.values.size.filter((formikSize) => formikSize !== size)
    );
  };

  // IMAGE MANAGEMENT

  const uploadImage = () => {
    formik.setValues({
      ...formik.values,
      images: [...formik.values.images, imageToAddObject],
    });

    // Clear the input field
    setImageToAddObject({ image: "", productColor: "" ,imageFile:""});

    setAddImageModal(false)
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
      formik.values.images.filter((formikImage) => formikImage !== image)
    );
  };

  const [addImageModal, setAddImageModal] = useState(false);

  const closeAddImageModal = () => {
    setAddImageModal(false);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Edit Product {productID} </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-12"
      >
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-600"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                Product Slug
              </label>
              <input
                type="text"
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
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
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
                Old Price
              </label>
              <input
                type="number"
                id="oldPrice"
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
                id="description"
                name="description"
                value={formik.values.description}
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
                type="number"
                id="stock"
                name="stock"
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
            {/* UPLOAD IMAGES  */}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                Product Images 
              </label>
            <div className="flex items-center gap-4 flex-wrap">

              {formik.values.images.length > 0 &&
                formik.values.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => deleteImage(image)}
                    className="w-[45%] h-40 bg-purple-500 text-white hover:bg-red-500 transition cursor-pointer shadow-lg flex justify-center items-center rounded-xl p-2"
                  >
                    <img
                      src={image.image || image.imageFile}
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

           {/* SIZE & COLOR VARIANTS */}

           <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-sm font-semibold text-gray-600"
              >
                size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                onKeyDown={handleKeyDown}
                placeholder="Ajouter une pointure"
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
                <ImageDropzone onDrop={onDrop} uploadedImages={uploadedstock} />
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
                    type="text"
                    id="productColor"
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
              onClick={uploadImage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Upload Image
            </button>
          </div>
        </Modal>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductDetailsAdmin;
