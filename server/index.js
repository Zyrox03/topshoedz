// app.js

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
// routes
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");
const sendEmailNotification = require("./sendEmailNotification");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const mongo_url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));

// "mongodb://127.0.0.1:27017/TopShoeDz"
async function main() {
  await mongoose.connect(mongo_url);
  console.log("Connected to Database");
}
// Define a simple mongoose model

app.use(express.json());
app.use(
  helmet({ hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } })
);
const corsOptions = {
  origin: "https://topshoes-dz.pages.dev",
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));
// Router routes

app.get("/", async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

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
    // Successful login
    const loginMessage = "Connexion réussie";
    res.json({ message: loginMessage, user: { email } });

    // Send email notification
    const emailSubject = "Nouvelle notification de connexion";
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
        <h2>Notification de nouvelle connexion</h2>
        <p>Une connexion réussie a été enregistrée sur le compte avec l'adresse e-mail : ${email}</p>
        <p>
          Pour des raisons de sécurité, si vous n'avez pas effectué cette connexion, veuillez contacter Said Bara immédiatement au 0781441049.
        </p>
        <div class="footer">
          <p>Cordialement,</p>
          <p>Votre équipe de sécurité</p>
        </div>
      </div>
    </body>
  </html>
`;

    await sendEmailNotification(emailSubject, emailBody);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const emailSubject = "Nouveau message via le formulaire de contact";
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
          .footer {
            margin-top: 20px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Nouveau message via le formulaire de contact</h2>
          <p>Nom: ${name}</p>
          <p>Email: ${email}</p>
          <p class="preserve-space" >Message: <br/> ${message}</p>
          
        </div>
      </body>
    </html>
  `;

    await sendEmailNotification(emailSubject, emailBody);

    res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
