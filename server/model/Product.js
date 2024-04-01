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

// Define a pre hook to automatically trim and lowercase the productColor before saving
productSchema.pre('save', function(next) {
  // Loop through each image in the images array
  this.images.forEach((image) => {

    if (image.image.path) {
      image.image.path = image.image.path.replace('/upload/', '/upload/q_auto,w_500,c_scale,f_auto,fl_lossy/');
    }

    // Ensure productColor exists and is a string
    if (image.productColor && typeof image.productColor === 'string') {
      // Trim and lowercase the productColor
      image.productColor = image.productColor.trim().toLowerCase();
    }
  });

  // Continue with the save operation
  next();
});

// Define a pre hook to automatically modify image paths before updating
productSchema.pre('findOneAndUpdate', function(next) {
  // Access the update object
  const update = this.getUpdate();
 
  update.images.forEach((image) => {

  if (image.image.path) {
    image.image.path = image.image.path.replace('/upload/', '/upload/q_auto,w_500,c_scale,f_auto,fl_lossy/');
  }

  // Ensure productColor exists and is a string
  if (image.productColor && typeof image.productColor === 'string') {
    // Trim and lowercase the productColor
    image.productColor = image.productColor.trim().toLowerCase();
  }
});


  // Continue with the update operation
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
