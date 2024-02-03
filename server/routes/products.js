const express = require("express");
const router = express.Router({ mergeParams: true });
const slugify = require("slugify");
const Product = require("../model/Product");

// cloudinary

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { storage } = require("../cloudinary");
const SpecialOffer = require("../model/SpecialOffer");
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const specialOffer = await SpecialOffer.find();

    res
      .status(200)
      .json({
        products,
        specialOffer: specialOffer.length > 0 ? specialOffer[0] : null,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// special product
router.post("/setup-special-offer/:slug", async (req, res) => {
  try {
    const { deadline, specialDescription } = req.body;
    const { slug } = req.params;

    if (!req.body.deleteSpecialOffer) {
      await SpecialOffer.deleteMany();

      return res.status(200).json({
        message: "Store doesn't have a special offer",
        specialOffer: null,
      });
    }

    // Find the product using the slug and update or create the special offer
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create a SpecialOffer document for the product
    let specialOffer = await SpecialOffer.findOne({ slug });

    if (!specialOffer) {
      specialOffer = new SpecialOffer({ _id: product._id });
    }

    await SpecialOffer.deleteMany();

    // Update the special offer
    specialOffer.deadline = deadline;
    specialOffer.specialDescription = specialDescription;
    specialOffer.slug = product.slug;
    specialOffer.name = product.name;

    await specialOffer.save();

    return res.json({
      specialOffer,
      message: "Special offer updated successfully",
    });
  } catch (error) {
    console.error("Error setting up special offer:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", upload.array("imageFiles"), async (req, res) => {
  try {
    const { name, slug, price, oldPrice, images, description, stock, size } =
      req.body;
    const newSlug = slug || slugify(name, { lower: true });

    // Attempt to parse the images property
    const parsedImages = JSON.parse(images);
    // Map over images and req.files to create the updatedImages array
    const updatedImages = parsedImages.map((image, index) => {
      // Update each image with the file information from req.files[0]
      if (req.files[index]) {
        return {
          image: {
            path: req.files[index].path,
            filename: req.files[index].filename,
          },
          productColor: image.productColor, // Use the existing productColor or provide a default value
        };
      }
      // If req.files[0] is not available, keep the existing image
      return image;
    });

    // Creating a new product using the static data
    const newProduct = new Product({
      name,
      slug: newSlug,
      price,
      oldPrice,
      images: updatedImages,
      description,
      stock,
      size: size || [],
    });

    // Saving the new product to the database
    const savedProduct = await newProduct.save();
    const updatedProducts = await Product.find();

    res.status(201).json({
      savedProduct,
      updatedProducts,
      message: "Product Added Successfully",
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.slug) {
      return res
        .status(400)
        .json({ message: "Product with this slug already exists" });
    }

    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

router.put("/:slug", upload.array("imageFiles"), async (req, res) => {
  try {
    const productSlug = req.params.slug;
    const { name, slug, price, oldPrice, images, description, stock, size } =
      req.body;

    // Use slugify only when the slug is empty
    const newSlug = slug || slugify(name, { lower: true });

    // Attempt to parse the images property
    const parsedImages = JSON.parse(images);

    // Fetch the existing product from the database using the productSlug
    const existingProduct = await Product.findOne({ slug: productSlug });

    // Check if the existing product has images
    const existingImages = existingProduct ? existingProduct.images : [];

    // Replace existingImages with modified parsedImages
    const updatedParsedImages = parsedImages
      .filter((parsedImage) => !parsedImage.imageFile) // Filter out objects where imageFile exists
      .map((parsedImage) => ({
        image: {
          path: parsedImage.image.path,
          filename: parsedImage.image.filename,
        },
        productColor: parsedImage.productColor,
      }));

    // Create a new array for newly uploaded images
    const newUploadedImages = req.files.map((file) => {
      const correspondingColor = parsedImages.find((parsedImage) => {
        if (parsedImage.imageFile?.path) {
          return parsedImage.imageFile.path === file.originalname;
        }
        return false;
      });

      return {
        image: {
          path: file.path,
          filename: file.filename,
        },
        productColor: correspondingColor ? correspondingColor.productColor : "",
      };
    });

    const mergedImages = updatedParsedImages.concat(newUploadedImages);

    // Find and update the product by its slug

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: productSlug },
      {
        name,
        slug: newSlug,
        price,
        oldPrice,
        images: mergedImages,
        description,
        stock,
        size: size || [],
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProducts = await Product.find();

    res
      .status(200)
      .json({ message: "Product Updated Successfully", updatedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the product by slug and remove it
    const deletedProduct = await Product.findOneAndDelete({ slug });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find and delete the associated SpecialOffer document
    const deletedSpecialOffer = await SpecialOffer.findOneAndDelete({
      slug: deletedProduct.slug,
    });

    const updatedProducts = await Product.find();
    const specialOffers = await SpecialOffer.find();


    res.status(200).json({
      message: "Product deleted successfully",
      updatedProducts,
      specialOffer: deletedSpecialOffer ? null : specialOffers[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
