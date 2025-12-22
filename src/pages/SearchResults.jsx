// src/pages/SearchResults.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import BookCard from "../components/BookCard";

export default function SearchResults({ books = [], addToCart }) {
  const q = new URLSearchParams(useLocation().search).get("q") || "";
  const qq = q.trim().toLowerCase();
  const results = qq ? books.filter(b => {
    const hay = `${b.title} ${b.author || ""} ${b.isbn || ""} ${b.publisher || ""} ${b.category || ""} ${b.description || ""}`.toLowerCase();
    return hay.includes(qq);
  }) : [];

  return (
    <Box sx={{ mt: 20, mb: 4, px: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Search results for “{q}”</Typography>
      {qq === "" ? <Typography>Enter a search term in the header to find books.</Typography> : results.length === 0 ? <Typography>No results found.</Typography> : (
        <Grid container spacing={2}>
          {results.map(b => (
            <Grid key={b.id} item xs={12} sm={6} md={3}>
              <BookCard book={b} onAddToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ mt: 3 }}>
        <Link to="/">Back to Home</Link>
      </Box>
    </Box>
  );
}
