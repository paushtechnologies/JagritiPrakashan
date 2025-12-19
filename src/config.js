// src/config.js
// Edit this file before deploying.
// - sheetsWebhookUrl: set to your deployed Google Apps Script Web App URL.
// - bankDetails: displayed on "Pay Now" modal.
// - upiVPA and upiQRImage: for UPI payment (static QR).
export const SITE = {
  title: "जागृति प्रकाशन",
  contactEmail: "orders@jagritiprakashan.example",
  
  // UPDATED: Your specific Google Apps Script Web App URL
  sheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbxC6pe2qLleCz9BD2bcr7THOLhboiND0ovwHJG9crl2s6N3FhGezW6nulE42HvAY8zo3Q/exec",

  // Payment display details
  upiVPA: "9873001494@upi", // Update this to your actual UPI ID
  upiQRImage: "assets/upi-qr.jpg", // Ensure this image exists in your public/assets folder
  bankDetails: {
    accountName: "Jagriti Prakashan",
    accountNumber: "123456789012",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank, Main Branch",
    branch: "City Center"
  },

  social: {
    facebook: "https://www.facebook.com/yourpage",
    youtube: "https://www.youtube.com/channel/yourchannel",
    instagram: "https://www.instagram.com/yourhandle"
  },
};