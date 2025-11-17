// src/pages/PayPage.jsx
import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

export default function PayPage() {
  return (
    <Box sx={{ mt: 22, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "70%", maxWidth: 1200 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left column: heading + bank details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Bank Account Details
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Account Name: Jagriti Prakashan</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Account Number: 1234567890</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>IFSC: JP0001234</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Bank: State Bank of India</Typography>
          </Grid>

          {/* Right column: large UPI QR image */}
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Box
              component="img"
              src={getAssetPath("assets/upi-qr.jpg")}
              alt="UPI QR"
              sx={{ width: "100%", maxWidth: 350, height: "450px", mx: "auto", borderRadius: 2, boxShadow: 4 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
