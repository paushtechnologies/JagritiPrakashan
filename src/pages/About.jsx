// src/pages/About.jsx
import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";
import { SITE } from "../config";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (!SITE.sheetsWebhookUrl) {
      alert("Contact form not configured (sheetsWebhookUrl missing).");
      return;
    }
    try {
      await fetch(SITE.sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString(),
          contactName: form.name,
          contactEmail: form.email,
          message: form.message,
          type: "contact"
        })
      });
      alert("Message sent — thank you!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, pt: 24 }}>
        About Jagriti Prakashan
      </Typography>
      <Grid container spacing={3}>
        {/* Left side: Info & Map */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Jagriti Prakashan is a leading publisher of educational and children's books.
            Our mission is to deliver high-quality, affordable educational resources across the region.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Contact</Typography>
          <Typography>Address: 123 Publisher Lane, City, State, PIN</Typography>
          <Typography>Phone: +91-98765-43210</Typography>
          <Typography>Email: {SITE.contactEmail}</Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Find us</Typography>
            <iframe
  title="map"
  src="https://www.google.com/maps?q=28.5901631,77.3326889&hl=es;z=14&output=embed"
  width="100%"
  height="260"
  style={{ border: 0, marginTop: 8 }}
  allowFullScreen=""
  loading="lazy"
></iframe>

          </Box>
        </Grid>

        {/* Right side: Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Send us a message</Typography>
            <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Email"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                sx={{ mb: 1 }}
              />
              <Button type="submit" variant="contained">
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
