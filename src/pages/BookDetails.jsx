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
      <Box sx={{ mt: { xs: 8, sm: 22 }, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Book not found.
        </Typography>
      </Box>
    );
  }

  // Use the processed Google Drive image URL
  const displayImage = book.image || getAssetPath("assets/covers/placeholder.png");

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        mt: { xs: 16, sm: 22 },
        borderRadius: 3,
        background: "linear-gradient(135deg, #fafafa, #fdfdfd)",
      }}
    >
      {/* Restored your original 24-column grid structure */}
      <Grid container spacing={4} columns={24}>

        {/* Book Image - Side by Side */}
        <Grid item xs={24} sm={12} md={8}>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 0,
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Box
              component="img"
              src={displayImage}
              alt={book.title}
              loading="lazy"
              decoding="async"
              sx={{ 
                width: '100%', 
                height: 'auto', 
                objectFit: 'contain', 
                maxHeight: { xs: 300, sm: 420 } 
              }}
            />
          </Box>
        </Grid>

        {/* Book Details (Title, Price, Add to Cart) - Side by Side with Image */}
        <Grid item xs={24} sm={12} md={16}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: "primary.main", fontSize: { xs: '1.25rem', sm: '2rem' } }}
          >
            {book.title}
          </Typography>

          {book.author && (
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontStyle: "italic", color: "text.secondary", fontSize: { xs: '0.95rem', sm: '1rem' } }}
            >
              by {book.author}
            </Typography>
          )}

          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 2, color: "success.main", fontSize: { xs: '1rem', sm: '1.5rem' } }}
          >
            ₹ {book.price}
          </Typography>

          {/* Add to Cart Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 1, 
            alignItems: { xs: 'stretch', sm: 'center' }, 
            mb: 3 
          }}>
            <TextField
              type="number"
              size="small"
              label="Qty"
              value={qty}
              inputProps={{ min: 1, max: 999 }}
              onChange={(e) => {
                const val = Math.max(1, Math.min(999, parseInt(e.target.value || "1", 10)));
                setQty(val);
              }}
              sx={{ width: { xs: '100%', sm: 100 } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(book.id, qty)}
              sx={{ 
                px: { xs: 2, sm: 3 }, 
                py: { xs: 1, sm: 1 }, 
                width: { xs: '100%', sm: 'auto' },
                backgroundColor: "#f0b04f"
              }}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Meta Info */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {book.category && (
              <Chip label={`Category: ${book.category}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
            {book.publisher && (
              <Chip label={`Publisher: ${book.publisher}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
            {book.year && (
              <Chip label={`Year: ${book.year}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
            {book.isbn && (
              <Chip label={`ISBN: ${book.isbn}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
          </Box>
        </Grid>

        {/* Description - Full Width Below Image and Details */}
        <Grid item xs={24}>
          <Divider sx={{ my: 2 }} />
          {book.description && (
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Description
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  lineHeight: 1.6, 
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  whiteSpace: "pre-line" 
                }}
              >
                {book.description}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}