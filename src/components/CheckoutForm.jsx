// src/components/CheckoutForm.jsx
import React, { useState } from "react";
import {
  Box, TextField, Grid, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SITE } from "../config";

export default function CheckoutForm({ cartItems = [], cartTotal = 0, onClearCart, onUpdateQty }) {
  const [form, setForm] = useState({
    firmName: "",
    address: "",
    email: "",
    phone: "",
    pincode: "",
    transactionId: ""
  });

  const [payOpen, setPayOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validateForm = () => {
    if (!form.firmName || !form.address || !form.email || !form.phone || !form.pincode) {
      alert("Please fill all required fields.");
      return false;
    }
    if (!/^[0-9]{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit Indian PIN code.");
      return false;
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const submitToSheet = async () => {
    if (!validateForm()) return;

    const orderLines = cartItems
      .map(i => `${i.title} — ${i.qty} × ₹${i.price} = ₹${(i.qty * i.price).toFixed(2)}`)
      .join("\n");

    const payload = {
      date: new Date().toISOString(),
      orderSummary: orderLines,
      total: cartTotal,
      ...form
    };

    if (!SITE.sheetsWebhookUrl) {
      alert("Orders cannot be saved: sheetsWebhookUrl missing in config.js.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(SITE.sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Order submitted successfully! We'll verify payment and contact you soon.");
        onClearCart();
      } else {
        alert("Failed to submit order. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while submitting order.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyVPA = async () => {
    try {
      await navigator.clipboard.writeText(SITE.upiVPA || "");
      alert("UPI VPA copied to clipboard");
    } catch {
      alert("Cannot copy automatically. Please copy: " + (SITE.upiVPA || ""));
    }
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Customer Details</Typography>

      {/* Cart Table Header */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            backgroundColor: "#FFA726",
            color: "#fff",
            p: 1,
            borderRadius: 1,
            fontWeight: "bold",
            mb: 1
          }}
        >
          <Typography>Book</Typography>
          <Typography>Price</Typography>
          <Typography align="center">Qty</Typography>
          <Typography>Subtotal</Typography>
        </Box>
      )}

      {/* Cart Items */}
      {cartItems.map(item => (
        <Box
          key={item.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            alignItems: "center",
            py: 1,
            borderBottom: "1px solid #ddd"
          }}
        >
          <Typography>{item.title}</Typography>
          <Typography>₹{item.price}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              sx={{ minWidth: 32, minHeight: 32, backgroundColor: "#f0b04f", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#FF9800" } }}
              onClick={() => onUpdateQty(item.id, Math.max(0, item.qty - 1))}
            >-</Button>
            <Typography sx={{ width: 25, textAlign: "center", fontWeight: 600 }}>{item.qty}</Typography>
            <Button
              size="small"
              variant="contained"
              sx={{ minWidth: 32, minHeight: 32, backgroundColor: "#f0b04f", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#FF9800" } }}
              onClick={() => onUpdateQty(item.id, item.qty + 1)}
            >+</Button>
          </Box>
          <Typography>₹{(item.qty * item.price).toFixed(2)}</Typography>
        </Box>
      ))}

      {/* Total aligned */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            pt: 1,
            mt: 1,
            borderTop: "2px solid #FFA726",
            fontWeight: 700
          }}
        >
          <Box />
          <Box />
          <Typography align="right">Total:&nbsp;</Typography>
          <Typography align="left"> ₹{cartTotal.toFixed(2)}</Typography>
        </Box>
      )}

      {/* Customer Info */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Firm Name" required fullWidth value={form.firmName} onChange={handleChange("firmName")} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" required fullWidth value={form.email} onChange={handleChange("email")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" required fullWidth value={form.address} onChange={handleChange("address")} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Phone" required fullWidth value={form.phone} onChange={handleChange("phone")} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Pin Code"
            required
            fullWidth
            value={form.pincode}
            onChange={handleChange("pincode")}
            inputProps={{ pattern: "[0-9]{6}" }}
            helperText="Enter 6-digit Indian PIN code"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Transaction ID (after payment)"
            fullWidth
            value={form.transactionId}
            onChange={handleChange("transactionId")}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => setPayOpen(true)}
            sx={{
              background: "linear-gradient(45deg, #66BB6A, #43A047, #388E3C)",
              fontWeight: "bold",
              color: "#fff",
              borderRadius: "50px",
              px: 2,
              fontSize: "1rem",
              animation: "pulse 1.5s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.08)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            Pay Now ₹{cartTotal.toFixed(2)}
          </Button>
        </Grid>
      </Grid>

      {/* Submit & Clear */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary" onClick={submitToSheet} disabled={submitting || cartItems.length === 0}>
          {submitting ? "Submitting..." : "Submit Order"}
        </Button>
        <Button variant="text" color="error" onClick={() => { if (confirm("Clear cart?")) onClearCart(); }}>Clear Cart</Button>
      </Box>

      {/* Pay modal */}
      <Dialog open={payOpen} onClose={() => setPayOpen(false)} maxWidth="md">
        <DialogTitle>Pay via UPI / Bank Transfer</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Bank Account Details</Typography>
              <Typography>Account Name: {SITE.bankDetails.accountName}</Typography>
              <Typography>Account No: {SITE.bankDetails.accountNumber}</Typography>
              <Typography>IFSC: {SITE.bankDetails.ifsc}</Typography>
              <Typography>Bank: {SITE.bankDetails.bankName}</Typography>
              <Button startIcon={<ContentCopyIcon />} onClick={copyVPA} sx={{ mt: 2 }}>Copy UPI</Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <img src={SITE.upiQRImage} alt="UPI QR" style={{ width: "100%", maxWidth: 300, borderRadius: 8, boxShadow: 4 }} />
              <Typography sx={{ mt: 1 }}>{SITE.upiVPA}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPayOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
