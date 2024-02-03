const mongoose = require("mongoose");

// Custom validator function to check reserved slugs
const reservedSlugsValidator = (value) => {
  const reservedSlugs = ["new", "admin"];
  return !reservedSlugs.includes(value.toLowerCase());
};

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: reservedSlugsValidator,
      message: "Invalid or reserved slug",
    },
  },

  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  images: [
    {
      image: {
        path: {
          type: String,
        },
        filename: {
          type: String,
        },
      },

      productColor: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  size: [
    {
      type: String, // Change to String for an array of strings
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
