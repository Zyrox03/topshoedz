// sendEmailNotification.js
const transporter = require("./nodemailerTransporter");

const sendEmailNotification = async (emailSubject, emailBody) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: emailSubject,
      html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error); // Reject the promise with the error
      } else {
        resolve(info.response); // Resolve the promise with the response
      }
    });
  });
};

module.exports = sendEmailNotification;
