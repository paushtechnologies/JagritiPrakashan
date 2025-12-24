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
} from "@mui/material";
import { Link } from "react-router-dom";

export default function BookCard({ book, onAddToCart, loading = false }) {
  const [imageError, setImageError] = useState(false);

  // 🔒 Dimensions (single source of truth)
  const CARD_WIDTH = { xs: 110, sm: 160 };
  const CARD_HEIGHT = { xs: 300, sm: 360 };
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
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "translateY(-4px)" },
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
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
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
                textTransform: "none",
                fontSize: { xs: "0.7rem", sm: "0.85rem" },
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
                backgroundColor: "#f0b04f",
                textTransform: "none",
                fontSize: { xs: "0.7rem", sm: "0.85rem" },
                "&:hover": { backgroundColor: "#d99a3d" },
              }}
            >
              Add
            </Button>
          </Stack>
        )}
      </CardActions>
    </Card>
  );
}
