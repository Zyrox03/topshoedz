const nodemailer = require("nodemailer");

//nodemailer stuff

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Transporter is verified");
  })
  .catch((err) => {
    console.error("Error verifying transporter:", err);
  });

module.exports = transporter;
