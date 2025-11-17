// src/components/BookCarousel.jsx
import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

/**
 * If bannerMode is true, we expect items to have `banner` property (filename under /assets/banners/)
 * If bannerMode is false, it behaves like previous carousel for book cards.
 */
export default function BookCarousel({
  books = [],
  onAddToCart,
  bannerMode = false,
}) {
  const [index, setIndex] = useState(0);
  const visible = bannerMode ? 1 : 4;
  const maxIndex = Math.max(0, Math.ceil(books.length / visible) - 1);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i < maxIndex ? i + 1 : 0));
    }, 3000);
    return () => clearInterval(t);
  }, [maxIndex]);

  const handlePrev = () => setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const start = index * visible;
  const slice = books.slice(start, start + visible);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 8,
          top: "45%",
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.8)",
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box sx={{ display: "flex", gap: 2, transition: "transform 400ms ease" }}>
        {slice.map((b, idx) =>
          bannerMode ? (
            <Paper
              key={idx}
              elevation={4}
              sx={{
                width: "100%",
                minHeight: { xs: 160, md: 360 },
                backgroundImage: `url(/assets/banners/${
                  b.banner || "banner-1.svg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 3,
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  width: "100%",
                  background: `linear-gradient(
      45deg,
      rgba(45, 60, 80, 0.6),  
      rgba(240, 176, 79, 0.75), 
      #ffd180                   
    )`,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 800 }}
                >
                  {b.title || ""}
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {b.subtitle || ""}
                </Typography>
              </Box>
            </Paper>
          ) : (
            // fallback: simple box (we're not using this in hero)
            <Box key={b.id} sx={{ width: "100%" }}>
              {b.title}
            </Box>
          )
        )}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 8,
          top: "45%",
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.8)",
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}
