import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

export default function FooterWave() {
  const theme = useTheme();
  // Using theme breakpoints to detect mobile (xs/sm)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 🌊 MOBILE: EXACT PREVIOUS IMPLEMENTATION (User Requested)
  if (isMobile) {
    return (
      <Box
        sx={{
          width: "100%",
          height: { xs: "40px", md: "110px" },
          lineHeight: 0,
          overflow: "hidden",
          position: "relative",
          mt: { xs: 0, md: 0 },
          transform: "rotate(180deg)", // 🌊 waves face upward
        }}
      >
        <svg
          viewBox={isMobile ? "0 0 1800 100" : "0 0 2400 100"}
          preserveAspectRatio="none"
          style={{
            display: "block",
            width: "200%", // 🔥 critical for smooth motion
            // height: {xs: "160px", md: "0px"},
            animation: "waveMove 22s linear infinite",
          }}
        >
          <defs>
            {/* ✅ Correct TOP (light) → BOTTOM (dark) gradient */}
            <linearGradient
              id="footerWaveGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              {/* Page background */}
              <stop offset="0%" stopColor="#d8c8b4" />

              {/* Soft mid blend */}
              <stop offset="40%" stopColor="#8a8c8cff" />

              {/* Footer image tone */}
              <stop offset="75%" stopColor="#6f736f" />
              <stop offset="100%" stopColor="#484e4eff" />
            </linearGradient>
          </defs>

          {/* 🌊 WAVE SHAPE */}
          <path
            d="
            M0,60
    C60,40 120,80 180,70
    C240,60 300,20 360,30
    C420,40 480,90 540,80
    C600,70 660,30 720,40
    C780,50 840,90 900,80
    C960,70 1020,30 1080,40
    C1140,50 1200,90 1260,80
    C1320,70 1380,40 1440,50
    C1500,60 1560,20 1620,30
    C1680,40 1740,80 1800,70
    L2880,0
    L0,0
    Z
          "
            fill="url(#footerWaveGradient)"
          />
        </svg>

        {/* ✅ GPU-friendly smooth motion */}
        <style>
          {`
            @keyframes waveMove {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          `}
        </style>
      </Box>
    );
  }

  // 🌊 DESKTOP: Sync Mask Wave
  // Uses CSS Masking to blend with the FIXED footer background below.
  const originalPathCurves = `
    M0,60
    C50,40 100,80 150,70
    C200,60 250,20 300,30
    C350,40 400,90 450,80
    C500,70 550,30 600,40
    C650,50 700,90 750,80
    C800,70 850,30 900,40
    C950,50 1000,90 1050,80
    C1100,70 1150,30 1200,40
    C1250,50 1300,90 1350,80
    C1400,70 1450,40 1500,50
    C1550,60 1600,20 1650,30
    C1725,45 1762,80 1800,70
  `;
  const maskPath = `${originalPathCurves} L1800,100 L0,100 Z`;

  const maskSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 100" preserveAspectRatio="none">
       <path d="${maskPath}" fill="black"></path>
    </svg>
  `);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        position: "relative",
        mt: -1,
        overflow: "hidden",
        zIndex: 1101,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // Fallback for older browsers
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${getAssetPath("assets/footershell.jpg")})`,

          // We apply the exact same background as Footer.jsx here
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${getAssetPath("assets/footershell.jpg")})`,
          backgroundSize: "100vw auto",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed",

          maskImage: `url("data:image/svg+xml;charset=utf-8,${maskSvg}")`,
          webkitMaskImage: `url("data:image/svg+xml;charset=utf-8,${maskSvg}")`,
          maskSize: "200% 100%",
          webkitMaskSize: "200% 100%",
          maskRepeat: "repeat-x",
          webkitMaskRepeat: "repeat-x",
          animation: "waveMask 22s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes waveMask {
            0% { mask-position: 0% 0; -webkit-mask-position: 0% 0; }
            100% { mask-position: 100% 0; -webkit-mask-position: 100% 0; }
          }
        `}
      </style>
    </Box>
  );
}
