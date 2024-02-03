// app.js

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
// routes
const productsRoutes = require("./routes/products");

const app = express();
const port = process.env.PORT || 3000;

const Order = require("./model/Order");
// Connect to MongoDB

const mongo_url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));

// "mongodb://127.0.0.1:27017/TopShoeDz"
async function main() {
  await mongoose.connect(mongo_url);
  console.log("Conncted to Database");
}
// Define a simple mongoose model

app.use(express.json());
app.use(helmet({ hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } }));
const corsOptions = {
  origin: 'https://topshoes-dz.pages.dev',
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));
// Router routes

app.use("/products", productsRoutes);

app.get("/", async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// ACCOUNT

const userEmail = process.env.ADMIN_EMAIL;
const userPasswordHash = process.env.ADMIN_PASSWORD_HASH;

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email !== userEmail) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Compare the provided password with the stored hashed password
    if (!bcrypt.compareSync(password, userPasswordHash)) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    res.json({ message: "Login successful", user: { email } });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// ORDER

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/orders", async (req, res) => {
  try {
    const {
      name,
      phone,
      wilaya,
      baladiya,
      notes,
      size,
      color,
      quantity,
      productInfo,
    } = req.body;

    // Create a new order using the Order model
    const newOrder = new Order({
      name,
      phone,
      wilaya,
      baladiya,
      notes,
      size,
      color,
      quantity,
      productInfo,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order data
    res.status(201).json({ savedOrder });
  } catch (error) {
    console.error("Error handling order submission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete order by ID
app.delete("/orders/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    // Check if the order with the given ID exists
    const order = await Order.findByIdAndDelete(_id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Get the updated array of orders after deletion
    const updatedOrders = await Order.find();

    res.status(200).json({
      message: "Order deleted successfully",
      updatedOrders: updatedOrders,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
