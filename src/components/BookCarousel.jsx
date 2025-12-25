import React, { useState, useEffect, useMemo } from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const AUTO_PLAY_INTERVAL = 6000;
const TRANSITION_MS = 2000; // Increased for smoothness

export default function BookCarousel({
  books = [],
  bannerMode = false,
  autoPlay = true,
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const [currentBg, setCurrentBg] = useState(null);
  const [nextBg, setNextBg] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if we are on mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width:600px)").matches;

  const visible = bannerMode ? 1 : 4;
  const maxIndex = Math.max(0, Math.ceil(books.length / visible) - 1);

  /* ---------------- AUTOPLAY ---------------- */
  useEffect(() => {
    if (!isPlaying || maxIndex === 0) return;

    const t = setInterval(() => {
      setIndex((i) => (i < maxIndex ? i + 1 : 0));
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(t);
  }, [isPlaying, maxIndex, index]); // 👈 Added 'index' to reset timer on change

  const handlePrev = () => {
    setIndex((i) => (i > 0 ? i - 1 : maxIndex));
    // setIsPlaying(false); // 👈 Removed to keep autoplay running
  };

  const handleNext = () => {
    setIndex((i) => (i < maxIndex ? i + 1 : 0));
    // setIsPlaying(false); // 👈 Removed to keep autoplay running
  };

  /* ---------------- IMAGE SOURCE ---------------- */
  const bannerSrc = useMemo(() => {
    if (!bannerMode || !books.length) return null;
    const item = books[index * visible];
    if (!item) return null;
    const banner = isMobile
      ? item.bannerMobile || item.banner
      : item.banner;
    return `${import.meta.env.BASE_URL}banners/${banner}`;
  }, [books, index, visible, isMobile, bannerMode]);

  /* ---------------- TRANSITION LOGIC ---------------- */
  useEffect(() => {
    if (!bannerSrc) return;

    if (!currentBg) {
      setCurrentBg(bannerSrc);
      return;
    }

    if (bannerSrc === currentBg) return;

    // Preload & Start
    const img = new Image();
    img.src = bannerSrc;
    img.onload = () => {
      setNextBg(bannerSrc);
      setIsTransitioning(true);

      const t = setTimeout(() => {
        setCurrentBg(bannerSrc);
        setNextBg(null);
        setIsTransitioning(false);
      }, TRANSITION_MS);
    };
  }, [bannerSrc, currentBg]);


  /* ---------------- RENDER SLICES ---------------- */
  // We create 7 slices for the "Seven" effect
  const SLICE_COUNT = 7;
  const slices = Array.from({ length: SLICE_COUNT });

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* CSS ANIMATION STYLES */}
      <style>
        {`
          /* EXTRA SOFT EASING */
          @keyframes sliceEnter {
            0% { 
              opacity: 0; 
              transform: translateX(30px) scale(1.05); /* Reduced movement, subtle scale */
            }
            100% { 
              opacity: 1; 
              transform: translateX(0) scale(1); 
            }
          }

          .slice-container {
            position: absolute;
            inset: 0;
            display: flex;
            width: 100%;
            height: 100%;
          }

          .slice-item {
            position: relative;
            height: 100%;
            flex: 1; 
            /* 101% width to overlap seams */
            width: calc(100% / ${SLICE_COUNT} + 1px);
            margin-right: -1px;
            
            background-size: ${SLICE_COUNT * 100}% 100%;
            background-repeat: no-repeat;
            will-change: transform, opacity;
          }

          /* Staggered animation for slices - Ultra Smooth */
          ${slices.map((_, i) => `
            .slice-anim-${i} {
              animation: sliceEnter 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              animation-delay: ${i * 100}ms; 
            }
          `).join("")}
        `}
      </style>

      {/* ARROWS */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: { xs: 0, md: 3 }, // 👈 Fix: 0 in mobile to push to corner
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          bgcolor: { xs: "transparent", md: "rgba(0,0,0,0.25)" },
          backdropFilter: { xs: "none", md: "blur(4px)" },
          border: { xs: "none", md: "1px solid rgba(255,255,255,0.2)" },
          "&:hover": { bgcolor: "rgba(0,0,0,0.5)", borderColor: "#fff" },
          color: "#fff",
          width: { xs: 32, md: 48 },
          height: { xs: 32, md: 48 },
          padding: { xs: 0, md: 1 }, // 👈 Remove default padding
          justifyContent: { xs: "flex-start", md: "center" },
        }}
      >
        <ChevronLeft sx={{ fontSize: { xs: 24, md: 32 }, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.7))" }} />
      </IconButton>

      <Paper
        elevation={0} // Add subtle shadow for depth
        sx={{
          position: "relative",
          aspectRatio: { xs: "2.5 / 1", md: "1400 / 360" },
          minHeight: { md: 300 },
          backgroundColor: "#000",
          overflow: "hidden",
          borderRadius: 0, // Reset: Parent (Home.jsx) will handle radius
        }}
      >
        {/* BACKGROUND (The Old Image) */}
        {currentBg && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${currentBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          />
        )}

        {/* FOREGROUND (The New Image - Sliced) */}
        {nextBg && isTransitioning && (
          <Box className="slice-container" sx={{ zIndex: 2 }}>
            {slices.map((_, i) => (
              <Box
                key={i}
                className={`slice-item slice-anim-${i}`}
                sx={{
                  backgroundImage: `url(${nextBg})`,
                  backgroundPosition: `${(i / (SLICE_COUNT - 1)) * 100}% center`,
                }}
              />
            ))}
          </Box>
        )}

        {/* TEXT OVERLAY */}
        <Box sx={{ position: "absolute", bottom: 16, left: 16, zIndex: 10 }}>
          <Typography variant="h6" color="#fff" sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
            {books[index]?.title || ""}
          </Typography>
        </Box>
      </Paper>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: { xs: 0, md: 3 }, // 👈 Fix: 0 in mobile to push to corner
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          bgcolor: { xs: "transparent", md: "rgba(0,0,0,0.25)" },
          backdropFilter: { xs: "none", md: "blur(4px)" },
          border: { xs: "none", md: "1px solid rgba(255,255,255,0.2)" },
          "&:hover": { bgcolor: "rgba(0,0,0,0.5)", borderColor: "#fff" },
          color: "#fff",
          width: { xs: 32, md: 48 },
          height: { xs: 32, md: 48 },
          padding: { xs: 0, md: 1 }, // 👈 Remove default padding
          justifyContent: { xs: "flex-end", md: "center" },
        }}
      >
        <ChevronRight sx={{ fontSize: { xs: 24, md: 32 }, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.7))" }} />
      </IconButton>
    </Box>
  );
}
