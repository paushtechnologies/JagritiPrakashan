// src/pages/BookDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  Skeleton,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

/**
 * Loading Skeleton Component
 */
const BookDetailsSkeleton = () => (
  <Paper
    elevation={3}
    sx={{
      p: { xs: 2, md: 4 },
      mt: { xs: 2, md: 6 },
      borderRadius: 3,
      background: "linear-gradient(135deg, #fafafa, #fdfdfd)",
    }}
  >
    <Grid container spacing={{ xs: 2, sm: 4 }}>
      {/* Column 1: Image */}
      <Grid item xs={12} md={4}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={420}
          sx={{ borderRadius: 2 }}
          animation="wave"
        />
      </Grid>
      {/* Column 2: Details */}
      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          <Skeleton variant="text" height={60} width="80%" />
          <Skeleton variant="text" height={40} width="60%" />
          <Skeleton variant="text" height={30} width="40%" />
          <Skeleton variant="text" height={80} width="100%" />
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Skeleton variant="rectangular" width={100} height={40} />
            <Skeleton variant="rectangular" width={140} height={40} />
          </Box>
          <Stack spacing={1} sx={{ mt: 3 }}>
            <Skeleton variant="rounded" width={150} height={32} />
            <Skeleton variant="rounded" width={180} height={32} />
            <Skeleton variant="rounded" width={120} height={32} />
          </Stack>
        </Stack>
      </Grid>
      {/* Column 3: Description */}
      <Grid item xs={12} md={4}>
        <Skeleton variant="text" height={40} width="40%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="95%" />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="90%" />
      </Grid>
    </Grid>
  </Paper>
);

export default function BookDetails({ books = [], addToCart, loading = false }) {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const book = books.find((b) => String(b.id) === String(id));
  const [qty, setQty] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (book) {
      document.title = `${book.title} | Jagriti Prakashan`;
      // Reset image state when book changes
      setImageLoaded(false);
      setImageError(false);

      // Debug Logs
      const missing = [];
      if (!(book.price > 0)) missing.push("price (invalid/zero)");
      if (!(book.fullImage || book.image)) missing.push("image (missing source)");
      if (!book.description) missing.push("description (missing)");

      if (missing.length > 0) {
        console.warn(`[BookDetails Debug] ID ${book.id} | "${book.title}" missing: ${missing.join(", ")}`);
      }
    }
  }, [book]);

  useEffect(() => {
    if (imageError && book) {
      console.warn(`[BookDetails Debug] ID ${book.id} | "${book.title}" image failed to load from source: ${book.fullImage || book.image}`);
    }
  }, [imageError, book]);

  if (loading) return <BookDetailsSkeleton />;

  if (!book) {
    return (
      <Box sx={{ mt: 20, textAlign: "center" }}>
        <Typography variant="h5" color="error" fontWeight={700}>
          पुस्तक नहीं मिली (Book not found)
        </Typography>
      </Box>
    );
  }

  const displayImage = book.fullImage || book.image;

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 2, md: 4 },
        mt: { xs: 2, md: 6 },
        borderRadius: { xs: 2, md: 4 },
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
      }}
    >
      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid item xs={24} sm={12} md={8}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 300, sm: 400, md: 450 },
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            {/* ✅ Content Logic: Image -> Names -> Skeleton */}
            {displayImage && !imageError ? (
              <Box
                component="img"
                src={displayImage}
                alt={book.title}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: imageLoaded ? "block" : "none",
                  zIndex: 2,
                }}
              />
            ) : (book.title || book.author) ? (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: { xs: 2, md: 5 },
                  textAlign: "center",
                  backgroundColor: "#f7f7f7",
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    color: "text.primary",
                    textTransform: "uppercase",
                    fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
                    lineHeight: 1.2,
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  {book.title}
                </Typography>
                {book.author && (
                  <Typography
                    variant="h5"
                    sx={{
                      fontStyle: "italic",
                      color: "text.secondary",
                      fontSize: { xs: "1rem", sm: "1.5rem" },
                    }}
                  >
                    लेखक: {book.author}
                  </Typography>
                )}
              </Box>
            ) : (
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ width: "100%", height: "100%" }}
              />
            )}

            {!imageLoaded && !imageError && displayImage && (
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ position: "absolute", inset: 0, zIndex: 1 }}
              />
            )}
          </Box>
        </Grid>

        {/* ================= COLUMN 2: DETAILS ================= */}
        <Grid item xs={24} sm={12} md={8}>
          <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ height: "100%" }}>
            <Box>
              {book.title ? (
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight={900}
                  sx={{
                    color: "#1A1A1A",
                    fontSize: { xs: "1.35rem", sm: "2rem", md: "2.2rem" },
                    lineHeight: 1.1,
                    mb: 1.5,
                    letterSpacing: -0.5,
                  }}
                >
                  {book.title}
                </Typography>
              ) : (
                <Skeleton variant="text" width="80%" height={60} />
              )}

              {book.title_search && book.title_search !== book.title && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    opacity: 0.7,
                    fontSize: { xs: "1.1rem", sm: "1.2rem" },
                    fontWeight: 500,
                  }}
                >
                  {book.title_search}
                </Typography>
              )}
            </Box>

            {book.author ? (
              <Typography
                variant="subtitle1"
                sx={{
                  fontStyle: "italic",
                  color: "primary.main",
                  fontWeight: 500,
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                }}
              >
                लेखक: {book.author}
              </Typography>
            ) : (
              <Skeleton variant="text" width="40%" height={30} />
            )}

            {book.price > 0 ? (
              <Typography
                variant="h3"
                fontWeight={600}
                sx={{
                  color: "#2E7D32", // Success Green
                  fontSize: { xs: "1.8rem", sm: "1.9rem", md: "2.4rem" },
                  my: 1,
                }}
              >
                ₹{book.price}
              </Typography>
            ) : (
              <Skeleton variant="text" width="30%" height={80} />
            )}

            {/* Action Section */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1, md: 2 },
                bgcolor: "#f8f9fa",
                borderRadius: { xs: 0.5, md: 1 },
                border: "1px solid #eee",
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
                width: { xs: "100%", sm: "fit-content" },
              }}
            >
              <TextField
                type="number"
                size="small"
                label="Quantity"
                value={qty}
                inputProps={{
                  min: 1,
                  max: 999999,
                  style: { textAlign: 'center', fontWeight: 600 }
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (parseInt(val) >= 1 && parseInt(val) <= 999999)) {
                    setQty(val);
                  }
                }}
                onBlur={() => {
                  if (qty === "" || parseInt(qty) < 1) {
                    setQty(1);
                  }
                }}
                sx={{
                  width: { xs: 100, sm: 110 },
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={() => addToCart(book.id, parseInt(qty) || 1)}
                sx={{
                  flexGrow: { xs: 1, sm: 0 },
                  px: { xs: 1, sm: 5 },
                  py: { xs: 0.8, md: 1.2 },
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: { xs: 2, md: 2 },
                  background: "linear-gradient(135deg, #f0b04f 0%, #ffc870 100%)",
                  boxShadow: "0 6px 15px rgba(240, 176, 79, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ffc870 0%, #f0b04f 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(240, 176, 79, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Add to Cart
              </Button>
            </Paper>

            {/* Meta Chips */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              {book.category ? (
                <Chip
                  label={`श्रेणी: ${book.category}`}
                  variant="outlined"
                  sx={{ borderRadius: "8px", fontWeight: 600, py: { xs: 1, md: 2 } }}
                />
              ) : (
                <Skeleton variant="rounded" width={100} height={32} />
              )}
              {book.publisher ? (
                <Chip
                  label={`प्रकाशक: ${book.publisher}`}
                  variant="outlined"
                  sx={{ borderRadius: "8px", fontWeight: 600, py: { xs: 1, md: 2 } }}
                />
              ) : (
                <Skeleton variant="rounded" width={140} height={32} />
              )}
              {book.isbn ? (
                <Chip
                  label={`ISBN: ${book.isbn}`}
                  variant="outlined"
                  sx={{ borderRadius: "8px", fontWeight: 600, py: 2 }}
                />
              ) : (
                <Skeleton variant="rounded" width={120} height={32} />
              )}
            </Stack>
          </Stack>
        </Grid>

        {/* ================= COLUMN 3: DESCRIPTION ================= */}
        <Grid item xs={24} md={8}>
          <Divider sx={{ mb: { xs: 1.5, md: 3 }, display: { xs: "block", md: "none" } }} />
          <Box
            sx={{
              height: "100%",
              borderLeft: { md: "2px solid #f0f0f0" },
              pl: { md: 4 },
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              gutterBottom
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: "1.25rem",
                color: "text.secondary",
              }}
            >
              विवरण
            </Typography>

            {book.description ? (
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "#444",
                  fontSize: "1rem",
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  textAlign: "justify",
                }}
              >
                {book.description}
              </Typography>
            ) : (
              <Skeleton variant="text" height={200} width="100%" animation="wave" />
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
