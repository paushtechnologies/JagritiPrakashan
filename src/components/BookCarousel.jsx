import React, { useState, useEffect, useMemo } from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import {
  ArrowForwardIos,
  PlayArrow,
  Pause,
} from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

/* =========================================================
   🔥 CHANGE ONLY THIS LINE TO TEST ANIMATIONS 🔥

   OPTIONS:
   "fade"
   "parallax"
   "zoom"--good
   "diagonal"
   "vertical"
   "rotate"--good
   "flipX"
   "flipY"
   "blurFade"
   "kenBurns"
   "swing"
   "skew"
   "split"
   "revealMask"
   "glitch"
   ========================================================= */
const ANIMATION_MODE = "glitch";

const TRANSITION_MS = 1600; // intentionally long for testing
const EASING = "cubic-bezier(.2,.6,.2,1)";

export default function BookCarousel({
  books = [],
  bannerMode = false,
  autoPlay = false, // 🔴 disable autoplay while testing
  autoPlayInterval = 8000,
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const [currentBg, setCurrentBg] = useState(null);
  const [nextBg, setNextBg] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const visible = bannerMode ? 1 : 4;
  const maxIndex = Math.max(0, Math.ceil(books.length / visible) - 1);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width:600px)").matches;

  /* ---------------- AUTOPLAY ---------------- */

  useEffect(() => {
    if (!isPlaying || maxIndex === 0) return;

    const t = setInterval(() => {
      setIndex((i) => (i < maxIndex ? i + 1 : 0));
    }, autoPlayInterval);

    return () => clearInterval(t);
  }, [isPlaying, autoPlayInterval, maxIndex]);

  const handlePrev = () => setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  /* ---------------- STABLE BANNER SOURCE ---------------- */

  const bannerSrc = useMemo(() => {
    if (!bannerMode || !books.length) return null;

    const item = books[index * visible];
    if (!item) return null;

    const banner = isMobile
      ? item.bannerMobile || item.banner
      : item.banner;

    return `${import.meta.env.BASE_URL}banners/${banner}`;
  }, [books, index, visible, isMobile, bannerMode]);

  /* ---------------- LOAD-LOCKED SWITCH ---------------- */

  useEffect(() => {
    if (!bannerSrc) return;

    if (!currentBg) {
      setCurrentBg(bannerSrc);
      return;
    }

    if (bannerSrc === currentBg) return;

    const img = new Image();
    img.src = bannerSrc;

    img.onload = () => {
      setNextBg(bannerSrc);
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentBg(bannerSrc);
        setNextBg(null);
        setIsTransitioning(false);
      }, TRANSITION_MS);
    };
  }, [bannerSrc, currentBg]);

  /* ---------------- TRANSFORMS ---------------- */

  const getTransform = (type) => {
    const out = type === "current";

    switch (ANIMATION_MODE) {
      case "fade":
        return "none";

      case "parallax":
        return out
          ? isTransitioning ? "translateX(-18%)" : "translateX(0)"
          : isTransitioning ? "translateX(0)" : "translateX(18%)";

      case "zoom":
        return out
          ? isTransitioning ? "scale(1.25)" : "scale(1)"
          : isTransitioning ? "scale(1)" : "scale(0.75)";

      case "diagonal":
        return out
          ? isTransitioning ? "translate(-20%, -10%)" : "translate(0)"
          : isTransitioning ? "translate(0)" : "translate(20%, 10%)";

      case "vertical":
        return out
          ? isTransitioning ? "translateY(25%)" : "translateY(0)"
          : isTransitioning ? "translateY(0)" : "translateY(25%)";

      case "rotate":
        return out
          ? isTransitioning ? "rotate(-12deg) scale(1.1)" : "rotate(0)"
          : isTransitioning ? "rotate(0)" : "rotate(12deg) scale(0.9)";

      case "flipX":
        return out
          ? isTransitioning ? "rotateX(90deg)" : "rotateX(0)"
          : isTransitioning ? "rotateX(0)" : "rotateX(-90deg)";

      case "flipY":
        return out
          ? isTransitioning ? "rotateY(90deg)" : "rotateY(0)"
          : isTransitioning ? "rotateY(0)" : "rotateY(-90deg)";

      case "blurFade":
        return out
          ? isTransitioning ? "scale(1.1)" : "scale(1)"
          : isTransitioning ? "scale(1)" : "scale(0.9)";

      case "kenBurns":
        return out
          ? isTransitioning ? "scale(1.35)" : "scale(1)"
          : isTransitioning ? "scale(1)" : "scale(1.05)";

      case "swing":
        return out
          ? isTransitioning ? "rotate(-18deg)" : "rotate(0)"
          : isTransitioning ? "rotate(0)" : "rotate(18deg)";

      case "skew":
        return out
          ? isTransitioning ? "skewX(-18deg)" : "skewX(0)"
          : isTransitioning ? "skewX(0)" : "skewX(18deg)";

      case "split":
        return out
          ? isTransitioning ? "scaleX(0)" : "scaleX(1)"
          : isTransitioning ? "scaleX(1)" : "scaleX(0)";

      case "revealMask":
        return out
          ? isTransitioning ? "translateX(-100%)" : "translateX(0)"
          : isTransitioning ? "translateX(0)" : "translateX(100%)";

      case "glitch":
        return out
          ? isTransitioning ? "translateX(-8%) skewX(-12deg)" : "none"
          : isTransitioning ? "none" : "translateX(8%) skewX(12deg)";

      default:
        return "none";
    }
  };

  const getFilter = () =>
    ANIMATION_MODE === "blurFade" && isTransitioning
      ? "blur(12px)"
      : "none";

  const baseStyle = {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: `all ${TRANSITION_MS}ms ${EASING}`,
  };

  /* ---------------- RENDER ---------------- */

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 8, top: "50%", zIndex: 10 }}>
        <ArrowBackIosNewIcon sx={{ color: "#fff" }} />
      </IconButton>

      <Paper
        sx={{
          position: "relative",
          aspectRatio: { xs: "2.5 / 1", md: "1400 / 360" },
          minHeight: { md: 300 },
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        {currentBg && (
          <Box
            sx={{
              ...baseStyle,
              backgroundImage: `url(${currentBg})`,
              opacity: isTransitioning ? 0 : 1,
              transform: getTransform("current"),
              filter: getFilter(),
            }}
          />
        )}

        {nextBg && (
          <Box
            sx={{
              ...baseStyle,
              backgroundImage: `url(${nextBg})`,
              opacity: isTransitioning ? 1 : 0,
              transform: getTransform("next"),
              filter: getFilter(),
            }}
          />
        )}

        <Box sx={{ position: "absolute", bottom: 16, left: 16, zIndex: 5 }}>
          <Typography variant="h6" color="#fff">
            {books[index]?.title || ""}
          </Typography>
        </Box>
      </Paper>

      <IconButton onClick={handleNext} sx={{ position: "absolute", right: 8, top: "50%", zIndex: 10 }}>
        <ArrowForwardIos sx={{ color: "#fff" }} />
      </IconButton>
    </Box>
  );
}
