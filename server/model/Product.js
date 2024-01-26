// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,

  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  images: {
    type: [String],
  },
  description: {
    type: String,
  },
  
  variants: [
    {
      size: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
    },
    // Add more variant properties as needed
  ],

  slug: {
    type: String,
    unique: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
