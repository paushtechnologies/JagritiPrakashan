import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Skeleton,
  Box,
  Dialog,
  DialogContent,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { getAssetPath } from "../utils/assetPath";

export default function BookCard({ book, onAddToCart, loading = false }) {
  const [imageError, setImageError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpenPopup(true);
  };
  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setOpenPopup(false);
  };

  // 🔒 Dimensions (single source of truth)
  const CARD_WIDTH = { xs: 110, sm: 160 };
  const CARD_HEIGHT = { xs: 290, sm: 360 };
  const IMAGE_HEIGHT = { xs: 180, sm: 240 };

  const hasBook = !!book;

  return (
    <Card
      elevation={3}
      sx={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 1, md: 2 },
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", // Smooth physics
        transformStyle: "preserve-3d", // Enable 3D
        perspective: "1000px",
        "&:hover": {
          transform: "translateY(-8px) rotateX(4deg) scale(1.02)", // The Tilt Pop
          boxShadow: "0 12px 24px -10px rgba(0,0,0,0.3)", // Deep shadow
        },
      }}
    >
      {/* ================= IMAGE ================= */}
      <Box sx={{ height: IMAGE_HEIGHT, width: "100%", overflow: "hidden" }}>
        {!hasBook || loading || !book?.image || imageError ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        ) : (
          <Box
            component="img"
            src={book.image}
            alt={book.title}
            onError={() => setImageError(true)}
            onClick={handleOpen}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              cursor: "zoom-in",
              transition: "transform 0.4s",
              "&:hover": { transform: "scale(1.1)" }
            }}
          />
        )}
      </Box>

      {/* ================= CONTENT ================= */}
      <CardContent sx={{ flexGrow: 1, p: 1, overflow: "hidden" }}>
        {/* Title */}
        {book?.title ? (
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontWeight: 700,
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {book.title}
          </Typography>
        ) : (
          <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
        )}

        {/* Author */}
        {book?.author ? (
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {book.author}
          </Typography>
        ) : (
          <Skeleton
            variant="text"
            sx={{ fontSize: "0.7rem", width: "70%" }}
          />
        )}

        {/* Price */}
        {book?.price != null ? (
          <Typography
            sx={{
              mt: 0.3,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              fontWeight: 700,
              color: "#f0b04f",
            }}
          >
            ₹{book.price}
          </Typography>
        ) : (
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", width: "50%", mt: 0.5 }}
          />
        )}
      </CardContent>

      {/* ================= ACTIONS ================= */}
      <CardActions sx={{ p: 1 }}>
        {!hasBook || loading ? (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={0.5}
            sx={{ width: "100%" }}
          >
            <Skeleton
              variant="rounded"
              height={28}
              animation="wave"
              sx={{ width: { xs: "100%", sm: "48%" } }}
            />
            <Skeleton
              variant="rounded"
              height={28}
              animation="wave"
              sx={{ width: { xs: "100%", sm: "48%" } }}
            />
          </Stack>
        ) : (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={0.5}
            sx={{ width: "100%" }}
          >
            <Button
              component={Link}
              to={`/book/${book.id}`}
              variant="outlined"
              size="small"
              fullWidth={{ xs: true, sm: false }}
              sx={{
                borderColor: "#f0b04f",
                color: "#f0b04f",
                backgroundColor: "transparent",
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "0.7rem", sm: "0.85rem" },
                boxShadow: "0 2px 4px rgba(240, 176, 79, 0.1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "#f0b04f",
                  color: "#fff",
                  borderColor: "#f0b04f",
                  boxShadow: "0 4px 12px rgba(240, 176, 79, 0.3)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              View
            </Button>

            <Button
              variant="contained"
              size="small"
              fullWidth={{ xs: true, sm: false }}
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(book.id, 1);
              }}
              sx={{
                background: "linear-gradient(135deg, #f0b04f 0%, #ffc870 100%)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 700,
                fontSize: { xs: "0.7rem", sm: "0.85rem" },
                border: "none",
                boxShadow: "0 4px 12px rgba(240, 176, 79, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #ffc870 0%, #f0b04f 100%)",
                  boxShadow: "0 6px 20px rgba(240, 176, 79, 0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Add
            </Button>
          </Stack>
        )}
      </CardActions>
      {/* IMAGE POPUP (Big View) */}
      <Dialog open={openPopup} onClose={handleClose} maxWidth="sm">
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            bgcolor: "#000",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden"
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

          <img
            src={book?.image || getAssetPath("assets/covers/placeholder.png")}
            alt={book?.title}
            style={{
              maxWidth: "100%",
              maxHeight: "85vh",
              display: "block",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
