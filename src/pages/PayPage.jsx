// src/pages/PayPage.jsx
import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { getAssetPath } from "../utils/assetPath";
import { SITE } from "../config";

export default function PayPage() {
  const { upiVPA, bankDetails, upiQRImage } = SITE.payment;

  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 6 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1, sm: 0 },
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, sm: 4 },
          // width: { xs: "100%", sm: "70%" },
          // maxWidth: 1200,
          alignContent: "center",
        }}
      >
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" justifyContent="center">
          {/* Left column: heading + bank details */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.75rem" } }}
            >
              Bank Account Details
            </Typography>

            <Grid>
              <Typography sx={{ mb: {xs: 0.3, md: 0.5} }}>
                Account Name: {bankDetails.accountName}
              </Typography>

              <Typography sx={{ mb: {xs: 0.3, md: 0.5} }}>
                Account Number: {bankDetails.accountNumber}
              </Typography>

              <Typography sx={{ mb: {xs: 0.3, md: 0.5} }}>
                IFSC: {bankDetails.ifsc}</Typography>

              <Typography sx={{ mb: {xs: 0.3, md: 0.5} }}>
                Bank: {bankDetails.bankName}
              </Typography>

              <Typography sx={{ mb: {xs: 0.2, md: 0.5} }}>
                UPI ID: {upiVPA}</Typography>
            </Grid>

            {/* Desktop-only Download Button under details */}
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              href={getAssetPath("assets/JPScanner.jpeg")}
              download="JPScanner"
              sx={{
                mt: 3,
                fontWeight: 700,
                color: "#d99a3d",
                borderColor: "#d99a3d",
                display: { xs: "none", md: "inline-flex" }, // 👈 Desktop only
                "&:hover": { borderColor: "#b06c00", color: "#b06c00", bgcolor: "rgba(240,176,79,0.1)" },
              }}
            >
              Download Scanner
            </Button>
          </Grid>

          {/* Right column: UPI QR image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Box
              component="img"
              src={getAssetPath(upiQRImage)}
              alt="UPI QR"
              sx={{
                width: { xs: 220, sm: "100%" },
                maxWidth: { xs: 220, sm: 350 },
                height: { xs: 220, sm: 450 },
                mx: "auto",
                borderRadius: 2,
                boxShadow: 4,
                display: "block",
                mb: 2,
              }}
            />
            {/* Mobile-only Download Button under QR */}
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              href={getAssetPath("assets/JPScanner.jpeg")}
              download="JPScanner"
              sx={{
                fontWeight: 700,
                color: "#d99a3d",
                borderColor: "#d99a3d",
                display: { xs: "inline-flex", md: "none" }, // 👈 Mobile only
                "&:hover": { borderColor: "#b06c00", color: "#b06c00", bgcolor: "rgba(240,176,79,0.1)" },
              }}
            >
              Download Scanner
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
