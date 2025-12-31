// src/pages/Gallery.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton, // 👈 Import Skeleton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAssetPath } from "../utils/assetPath";

export default function Gallery({ books = [], addToCart, loading = false }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const pageRef = useRef(null);

  const handleClose = () => setSelectedBook(null);
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };
  // Instant visibility for Gallery

  return (
    <Box ref={pageRef} sx={{ mt: { xs: 2, sm: 8 }, mb: { xs: 4, sm: 8 } }}>
      {/* GRID */}
      <Box
        sx={{
          px: { xs: 1, sm: 0 },
          mt: { xs: 1, sm: 2 },
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(5,1fr)",
            lg: "repeat(7,1fr)",
          },
          gap: { xs: 1, sm: 2 },
        }}
      >
        {loading
          ? Array.from(new Array(21)).map((_, i) => (
            <Card
              key={i}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: { xs: 1, sm: 2 },
                boxShadow: { xs: 2, sm: 3 },
              }}
            >
              <Skeleton variant="rectangular" height={200} animation="wave" />
              <CardContent sx={{ p: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton
                  variant="rectangular"
                  width={50}
                  height={24}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          ))
          : books
            .filter((b) => b.display === "card")
            .map((book, index) => (
              <Card
                key={book.id}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: { xs: 1, sm: 2 },
                  boxShadow: { xs: 3, sm: 6 },
                  height: { xs: "95%", md: "99%" },
                  overflow: "hidden",
                  transition: "transform 0.2s ease-out",
                  willChange: "transform",
                  "&:hover": { transform: "translateY(-4px) scale(1.02)" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: 150, sm: 200, md: 230 },
                    cursor: "pointer",
                    backgroundColor: "#f7f7f7",
                    overflow: "hidden",
                  }}
                  onClick={() => setSelectedBook(book)}
                >
                  {/* ✅ Content Logic: Image -> Names -> Skeleton */}
                  {book.image && !imgErrors[book.id] ? (
                    <CardMedia
                      component="img"
                      image={book.image}
                      alt={book.title}
                      loading={index < 21 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index < 21 ? "high" : "auto"}
                      onError={() => handleImgError(book.id)}
                      sx={{
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (book.title || book.author) ? (
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 1.75,
                        overflow: "hidden",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            color: "text.primary",
                            fontSize: { xs: "0.65rem", sm: "1rem", md: "1.2rem" },
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: { xs: 4, sm: 5 },
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            wordBreak: "break-word",
                            textShadow: "0 0 10px rgba(255,255,255,0.8)",
                          }}
                        >
                          {book.title}
                        </Typography>

                        {book.author && (
                          <Typography
                            variant="subtitle2"
                            sx={{
                              mt: { xs: 0.5, sm: 1.5 },
                              textAlign: "center",
                              fontStyle: "italic",
                              color: "text.secondary",
                              fontSize: { xs: "0.7rem", sm: "0.9rem" },
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            लेखक : {book.author}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      height="100%"
                      animation="wave"
                    />
                  )}
                </Box>

                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: { xs: 0.5, sm: 1 },
                    gap: { xs: 0.5, sm: 1 },
                  }}
                >
                  {typeof book.price !== "undefined" && (
                    <Typography
                      color="text.primary"
                      fontWeight={600}
                      sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                    >
                      ₹{book.price}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => addToCart(book.id)}
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                      py: { xs: 0.45, sm: 0.5 },
                      minWidth: { xs: 40, sm: 60 },
                      backgroundColor: "#f0b04f",
                      "&:hover": { backgroundColor: "#d99a3d" },
                    }}
                  >
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))
        }
      </Box>

      {/* IMAGE POPUP */}
      <Dialog open={!!selectedBook} onClose={handleClose} maxWidth="sm">
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            bgcolor: "#000",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedBook && (selectedBook.fullImage || selectedBook.image) && (
            <img
              src={selectedBook.fullImage || selectedBook.image}
              alt={selectedBook.title}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                display: "block",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box >
  );
}
