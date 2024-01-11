const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.post("/", (req, res) => {
  res.send("Posting data");
});

app.get("/demo", (req, res) => {
  res.send("demo ist gut");
});

app.post("/send-email", (req, res) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    // getting sender email and password from .env file
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailDetails = {
    from: process.env.EMAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message,
  };

  //Sending email through the node mailer
  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      // Returning the error message in case of any errors
      res.send(err);
    } else {
      // Returning Success message when email is sent successfully
      res.send(`Email sent successfully to ${req.body.to}`);
    }
  });
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Backend is running on localhost:4000")
);
