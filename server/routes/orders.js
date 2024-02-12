const express = require("express");
const Order = require("../model/Order");
const sendEmailNotification = require("../sendEmailNotification");
const router = express.Router({ mergeParams: true });

// ORDER

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      wilaya,
      baladiya,
      deliveryOption,
      notes,
      size,
      color,
      quantity,
      productInfo,
    } = req.body;

    const deliveryPrice = deliveryOption.livraisonPrice;
    const productPrice = productInfo.price;
    const orderTotal = productPrice * quantity + deliveryPrice;

    // Create a new order using the Order model
    const newOrder = new Order({
      name,
      phone,
      wilaya,
      baladiya,
      deliveryOption,
      notes,
      size,
      color,
      quantity,
      productInfo,
      orderTotal,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order data
    res.status(201).json({ savedOrder });

    const emailSubject = "Nouvelle Commande - Top Shoes DZ";
    const emailBody = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f2f2f2;
                color: #333333;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h2 {
                color: #4285f4;
              }
              p {
                margin-bottom: 15px;
              }

              .preserve-space {
                white-space: pre-line;
              }

              .footer {
                margin-top: 20px;
                color: #777777;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Nouvelle commande</h2>
              <p>Nom: ${name}</p>
              <p>Téléphone: ${phone}</p>
              <p>Wilaya: ${wilaya}</p>
              <p>Baladiya: ${baladiya}</p>
              <p>Taille: ${size}</p>
              <p>Couleur: ${color}</p>
              <p>Quantité: ${quantity}</p>
              <p>Informations sur le produit:</p>
              <ul>
                <li>Nom: ${productInfo.name}</li>
                <li>Prix: ${productInfo.price} DA</li>
                <li>Identifiant: ${productInfo.slug}</li>
              </ul>
        <p class="preserve-space">Notes: <br/> ${notes}</p>

              <div class="footer">
                <p>Merci pour votre commande!</p>
                <p>Cette notification est envoyée au propriétaire du magasin.</p>
                <p>TopShoes</p>
              </div>
            </div>
          </body>
        </html>
      `;

    await sendEmailNotification(emailSubject, emailBody);
  } catch (error) {
    console.error("Error handling order submission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete order by ID
router.delete("/:_id", async (req, res) => {
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

module.exports = router;
