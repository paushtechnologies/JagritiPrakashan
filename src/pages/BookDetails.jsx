// src/pages/BookDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

export default function BookDetails({ books = [], addToCart }) {
  const { id } = useParams();
  const book = books.find((b) => String(b.id) === String(id));
  const [qty, setQty] = useState(1);

  if (!book) {
    return (
      <Box sx={{ mt: 22, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Book not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 22,
        borderRadius: 3,
        background: "linear-gradient(135deg, #fafafa, #fdfdfd)",
      }}
    >
      <Grid container spacing={4} size={6} columns={24}>
        {/* Book Image */}
        <Grid item sm={12} md={4}>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 0,
              bgcolor: "#fff",
            }}
          >
            <img
              src={getAssetPath(book.cover || "assets/covers/placeholder.png")}
              alt={book.title}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                maxHeight: 420,
              }}
            />
          </Box>
        </Grid>

        {/* Book Details */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            {book.title}
          </Typography>

          {book.author && (
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontStyle: "italic", color: "text.secondary" }}
            >
              by {book.author}
            </Typography>
          )}

          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 2, color: "success.main" }}
          >
            ₹ {book.price}
          </Typography>

          

          {/* <Divider sx={{ my: 2 }} /> */}

          {/* Add to Cart Section */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
            <TextField
              type="number"
              size="small"
              label="Qty"
              value={qty}
              onChange={(e) => {
                const val = Math.max(0, Math.min(999, parseInt(e.target.value || "0", 10)));
                setQty(val);
              }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(book.id, qty)}
              sx={{ px: 3, py: 1 }}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Book Meta Info - stacked vertically */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {book.publisher && (
              <Chip
                label={`Publisher: ${book.publisher}`}
                variant="outlined"
                sx={{ width: "fit-content" }}
              />
            )}
            {book.year && (
              <Chip label={`Year: ${book.year}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
            {book.isbn && (
              <Chip label={`ISBN: ${book.isbn}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={16}>
          
          <Divider sx={{ my: 2 }} />
          {book.description && (
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
              {book.description}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
