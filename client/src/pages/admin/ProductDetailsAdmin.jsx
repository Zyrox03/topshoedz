import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageDropzone from "../../components/Dashboard/ImageDropzone";

const ProductDetailsAdmin = () => {
  const { productID } = useParams();

  // Example product data
  const sampleProduct = {
    name: "Air Force Montante",
    price: 19.99,
    oldPrice: 40,
    stock: 20,
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    // Add more fields as needed
  };

  const [product, setProduct] = useState({ ...sampleProduct });
  const [uploadedstock, setUploadedstock] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const onDrop = (acceptedFiles) => {
    setUploadedstock(acceptedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSave = () => {
    // Replace this with your logic to save the edited product details
    console.log("Product details saved:", product);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Edit Product {productID} </h1>

      <form className="w-full flex flex-col gap-12">
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
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
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
                name="slug"
                value={product?.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
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
                value={product.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
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
                value={product.oldPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4 bg-slate-100 p-2 border border-purple-500">
              <span className=" ">
                Le client aura{" "}
                <span className="font-bold text-purple-500">
                  {Math.floor(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                  )}
                  %{" "}
                </span>
                de deduciton sur ce produit à l&apos;achat
              </span>
            </div>

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
                value={product.description}
                onChange={handleChange}
                className="w-full h-60 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
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
                value={product?.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex-1">
            {/* UPLOAD stock  */}

            <div className="flex items-center gap-4 flex-wrap">
              <ImageDropzone onDrop={onDrop} uploadedstock={uploadedstock} />
              <ImageDropzone onDrop={onDrop} uploadedstock={uploadedstock} />
              <ImageDropzone onDrop={onDrop} uploadedstock={uploadedstock} />
              <ImageDropzone onDrop={onDrop} uploadedstock={uploadedstock} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductDetailsAdmin;
