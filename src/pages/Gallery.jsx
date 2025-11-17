// src/pages/Gallery.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Gallery({ books = [], addToCart }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleClose = () => setSelectedBook(null);

  return (
    <Box sx={{ mt: 22, mb: 8 }}>
      <Typography color="rgba(13, 27, 42, 0.7)"variant="h4" fontWeight={700} gutterBottom>
        Books Gallery
      </Typography>

  <Box sx={{ px: 0,mt: 2, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {books.map((book) => (
          <Card
            key={book.id}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              boxShadow: 6,
            }}
          >
            <CardMedia
              component="img"
              image={book.cover || "/src/assets/covers/placeholder.png"}
              alt={book.title}
              sx={{
                height: 250,
                objectFit: "cover",
                backgroundColor: "#f7f7f7",
                cursor: "pointer",
              }}
              onClick={() => setSelectedBook(book)}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pl: 1,
                pr: 1,
                pb: 0,
                pt:0.5
              }}
            >
              {typeof book.price !== "undefined" && (
                <Typography variant="body1" color="text.primary" fontWeight={700}>
                  ₹{book.price}
                </Typography>
              )}
              <Button
                variant="contained"
                size="small"
                onClick={() => addToCart(book.id)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Image Popup */}
      <Dialog open={!!selectedBook} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 10, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
          {selectedBook && (
            <img
              src={selectedBook.cover || "/src/assets/covers/placeholder.png"}
              alt={selectedBook.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
