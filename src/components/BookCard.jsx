// src/components/BookCard.jsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function BookCard({ book, onAddToCart }) {
  return (
    <Card sx={{ height: "100%", width:"200px", display: "flex", flexDirection: "column" }} elevation={3}>
      <CardMedia
        component="img"
        image={book.cover || "/src/assets/covers/placeholder.png"}
        alt={book.title}
        sx={{ height: 180, objectFit: "contain", bgcolor: "#fafafa" }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1" noWrap>{book.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{book.author || ""}</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>₹ {book.price}</Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
          <Button size="small" component={Link} to={`/book/${book.id}`} variant="outlined" sx={{ color: "#f0b04f", borderColor: "#f0b04f" }}>View</Button>
          <Button size="small" variant="contained" onClick={() => onAddToCart(book.id, 1)} sx={{ backgroundColor: "#f0b04f", color: "#fff" }}>Add</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
