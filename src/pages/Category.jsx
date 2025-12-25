// src/pages/Category.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import BookCard from "../components/BookCard";

export default function Category({ books = [], addToCart, loading = false }) {
  const { category } = useParams();
  const catDecoded = decodeURIComponent(category || "");
  const list = books.filter(b => (b.category || "").toLowerCase() === catDecoded.toLowerCase());

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2, mt: { xs: 0, sm: 4 } }}>{catDecoded} — Books</Typography>
      <Grid container spacing={2}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <BookCard loading={true} />
            </Grid>
          ))
          : list.length ? list.map(b => (
            <Grid key={b.id} item xs={12} sm={6} md={3}>
              <BookCard book={b} onAddToCart={addToCart} />
            </Grid>
          )) : <Typography>No books found in this category.</Typography>}
      </Grid>
    </div>
  );
}
