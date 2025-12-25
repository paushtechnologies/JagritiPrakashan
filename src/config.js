// src/config.js
// Edit this file before deploying.
// - sheetsWebhookUrl: set to your deployed Google Apps Script Web App URL.
// - bankDetails: displayed on "Pay Now" modal.
// - upiVPA and upiQRImage: for UPI payment (static QR).
export const SITE = {
  title: "जागृति प्रकाशन",
  contactEmail: "jagritiprakashan01@gmail.com",

  // UPDATED: Your specific Google Apps Script Web App URL
  sheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbyhWAGrwFde1sgDrUQkvKEY2EEulZB2FldTawfejpXORp9AQOc6DgHpqAA_i0IfWnUy/exec",

  payment: {
    upiVPA: "q770182017@ybl",
    upiQRImage: "assets/UpiQR.jpeg",

    bankDetails: {
      accountName: "Jagriti Prakashan",
      accountNumber: "2726002100011341",
      ifsc: "PUNB0272600",
      bankName: "Punjab National Bank",
    },
  },

  social: {
    facebook: "https://www.facebook.com/people/Jagriti-Prakashan/pfbid0WKsV28NucvBEDtmmq7x3Sa6gK9ZjyWZWLqHhptK3V6HC687TR4fnrmLRouSGi3Svl/",
    youtube: "https://www.youtube.com/@JagritiPrakashan",
    twitter: "https://www.jagritiprakashan.com/"
  },
};