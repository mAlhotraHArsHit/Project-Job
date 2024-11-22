const express = require("express");
// import express from "express"
const nodemailer = require("nodemailer");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER, // Replace with your Gmail email address
    pass: process.env.PASS, // Replace with your Gmail password
  },
});

// CORS middleware
app.use(cors());

// POST endpoint to handle sending emails
app.post("/sendEmail/:email", (req, res) => {
  // console.log("we hit thi", req.params.email);
  // const email = req.body.email;
  console.log('We hit the server with ',req.params.email)
  const email = req.params.email
  const mailOptions = {
    from: "harshit1636.be22@chitkara.edu.in", // Replace with your Gmail email address
    // to: "itz.hanish@gmail.com",
    to: email,
    subject: "Project Job",
    text: "ThankYou for visiting on our website. We will provide you with latest updates on internship.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json
        ({ "message":"Failed to send email" });

    } else {
      console.log("Email sent:", info.response);
      res.status(200).json
        ({ "message":"sent email successfully" });
    }
  });
});
app.use("*",(req,res)=>{
  res.status(404).json({
   status:"fail",
   message:`we could not found rout ${req.originalUrl}` 
  })
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
