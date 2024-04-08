const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();  // Load environment variables

const app = express();

// Replace with your desired email recipient address (optional)
const recipientEmail = process.env.EMAIL_RECIPIENT || 'your_email@example.com';

// Configure email transporter using environment variables
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'contact@yourwebsite.com',  // Replace with your website email (optional)
    to: recipientEmail,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Export the Express app for Vercel deployment
module.exports = app;
