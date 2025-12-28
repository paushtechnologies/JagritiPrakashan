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
  const [imgError, setImgError] = React.useState(false);

  const handleImgError = (id) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
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
              .map((book, index) => {
                const displayImage =
                  book.image || getAssetPath("assets/covers/placeholder.png");

                return (
                  <Card
                    key={book.id}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: { xs: 1, sm: 2 },
                      boxShadow: { xs: 3, sm: 6 },
                      height: {xs: "95%", md: "99%"},
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
                      }}
                      onClick={() => setSelectedBook(book)}
                    >
                      {/* ✅ Image (only if loaded successfully) */}
                      {!imgError && (
                        <CardMedia
                          component="img"
                          image={displayImage}
                          alt={book.title}
                          loading={index < 21 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={index < 21 ? "high" : "auto"}
                          onError={() => setImgError(true)}
                          sx={{
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      {/* ✅ Fallback content */}
                      {imgError && (
                        <Box
                          sx={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 1,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 800,
                                textAlign: "center",
                                px: 1.5,
                                color: "text.secondary",
                                fontSize: { xs: "1rem", sm: "1.5rem" },
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                lineHeight: 1.3,
                                display: "-webkit-box",
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textShadow: "0 0 10px rgba(255,255,255,0.8)",
                              }}
                            >
                              {book.title}
                            </Typography>

                            <Typography
                              variant="subtitle1"
                              sx={{
                                mt: { xs: 1, md: 3 },
                                textAlign: "center",
                                fontStyle: "italic",
                                color: "text.secondary",
                                fontSize: { xs: "0.85rem", sm: "1rem" },
                              }}
                            >
                              लेखक : {book.author}
                            </Typography>
                          </Box>
                        </Box>
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
                );
              })}
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

          {selectedBook && (
            <img
              src={
                selectedBook.fullImage ||
                selectedBook.image ||
                getAssetPath("assets/covers/placeholder.png")
              }
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
    </Box>
  );
}
